const parseEmail =
require("../services/emailParserService");

const emailQueue =
require("../queues/emailQueue");

const refreshAccessToken =
require("./tokenService");

const fetchEmails =
require("./gmailService");

const Email =
require("../models/Email");

const fetchHistoryEmails =
require("./gmailHistoryService");

const fetchEmailById =
require("./fetchEmailById");

async function syncUser(user){

    const accessToken =
        await refreshAccessToken(
            user.refreshToken
        );

    let emails = [];

    if(!user.lastHistoryId){

        emails =
            await fetchEmails(
                accessToken
            );

        if(emails.length > 0){

            user.lastHistoryId =
                emails[0].historyId;

        }

    }

    else{

        let history;

        try{

            history =
                await fetchHistoryEmails(
                    accessToken,
                    user.lastHistoryId
                );

        }

        catch(err){

            if(err.code === 404){

                console.log(
                    "History expired. Falling back to full sync."
                );

                user.lastHistoryId =
                    null;

                await user.save();

                return syncUser(user);

            }

            throw err;

        }

        const messageIds =
            new Set();

        for(
            const record
            of history
        ){

            if(
                !record.messagesAdded
            ){
                continue;
            }

            for(
                const item
                of record.messagesAdded
            ){

                messageIds.add(
                    item.message.id
                );

            }

        }

        const results =
            await Promise.allSettled(

                Array.from(
                    messageIds
                ).map(

                    id =>

                    fetchEmailById(
                        accessToken,
                        id
                    )

                )

            );

        emails =
            results
            .filter(
                result =>
                result.status ===
                "fulfilled"
            )
            .map(
                result =>
                result.value
            );

        if(history.length > 0){

            user.lastHistoryId =
                history[
                    history.length - 1
                ].id;

        }

    }

    let newEmails = 0;

    for(
        const email
        of emails
    ){

        const parsedEmail =
            await parseEmail(
                email,
                user.googleId
            );

        const existingEmail =
            await Email.findOne({

                gmailId:
                parsedEmail.gmailId

            });

        if(existingEmail){
            continue;
        }

        const savedEmail =
            await Email.create(
                parsedEmail
            );

        await emailQueue.add(

            "process-email",

            {
                emailId:
                savedEmail._id
                .toString()
            },

            {

                attempts:3,

                backoff:{
                    type:"exponential",
                    delay:5000
                },

                removeOnComplete:
                100,

                removeOnFail:
                50

            }

        );

        newEmails++;

    }

    user.lastSyncedAt =
        new Date();

    await user.save();

    return {
        newEmails
    };

}

module.exports =
    syncUser;