const fetchEmails =require("../services/gmailService");
const {getHeader,extractBody}=require("../utils/emailParser");
const cleanEmailTexts=require("../utils/cleanEmail");
async function getEmails(req,res){

    try{
        const accessToken=req.user.accessToken;
        const emails = await fetchEmails(accessToken);
        const parsedEmails=emails.map(email => {
            return {
                gmailId: email.id,
                threadId: email.threadId,
                snippet: email.snippet,
                subject: getHeader(email.payload.headers,"Subject"),
                sender:getHeader(email.payload.headers,"From"),
                body: cleanEmailTexts(extractBody(email.payload))

            };
        });
        res.json(parsedEmails);
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            error:"Failed to fetch emails"
        });
    }
}

module.exports={getEmails};
