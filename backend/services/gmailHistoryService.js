const { google } = require("googleapis");

async function fetchHistoryEmails(
    accessToken,
    historyId
){

    const oauth2Client =
        new google.auth.OAuth2();

    oauth2Client.setCredentials({
        access_token: accessToken
    });

    const gmail =
        google.gmail({
            version: "v1",
            auth: oauth2Client
        });

    const response =
        await gmail.users.history.list({

            userId: "me",

            startHistoryId:
            historyId,

            historyTypes: [
                "messageAdded"
            ]

        });

    return (
        response.data.history
        || []
    );

}

module.exports =
    fetchHistoryEmails;