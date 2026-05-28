const fetchEmails =require("../services/gmailService");
const {getHeader,extractBody}=require("../utils/emailParser");
const cleanEmailTexts=require("../utils/cleanEmail");
const Email=require("../models/Email");

async function getEmails(req,res){

    try{
        const accessToken=req.user.accessToken;
        const emails = await fetchEmails(accessToken);
        const parsedEmails=await Promise.all(
        
        emails.map(async email => {
            const parsedEmail={
                userId: req.user.googleId,
                gmailId: email.id,
                threadId: email.threadId,
                snippet: email.snippet,
                subject: getHeader(email.payload.headers,"Subject"),
                sender:getHeader(email.payload.headers,"From"),
                body: cleanEmailTexts(extractBody(email.payload)),
                receivedAt: new Date(getHeader(email.payload.headers,"Date"))
            
            };
            const existingEmail = await Email.findOne({
                gmailId: parsedEmail.gmailId
            });

            if (!existingEmail){
                await Email.create(parsedEmail);
            }
            return parsedEmail;

        }
    )
    
        );
        res.json(parsedEmails);


     
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            error:"Failed to fetch emails"
        });
    }
}

async function getStoredEmails(req,res){
    try{
        const emails= await Email.find({
            userId: req.user.googleId
        }).sort({receivedAt:-1});
        res.json(emails);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: `Failed to retrieve email from MongoDB `});
    }
}
module.exports={getEmails,getStoredEmails};
