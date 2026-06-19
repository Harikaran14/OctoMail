const fetchEmails =require("../services/gmailService");
const {getHeader,extractBody}=require("../utils/emailParser");
const cleanEmailTexts=require("../utils/cleanEmail");
const Email=require("../models/Email");
const decodeRawEmail =require("../utils/decodeRawEmail");
const parseRawEmail = require("../utils/parseRawEmail");
const parseEmail = require("../services/emailParserService");
const refreshAccessToken = require("../services/tokenService");

async function getEmails(req,res){

    try{
        
        const accessToken= await refreshAccessToken( req.user.refreshToken);
        const emails = await fetchEmails(accessToken);
        const parsedEmails=await Promise.all(
        
        emails.map(async email => {
            const parsedEmail= await parseEmail(email,req.user.googleId);
            
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

async function getEmailById(req,res){
    const email= await Email.findOne({
        _id:req.params.id
    });
    res.json(email);

}

async function getEmailsByCategory(req,res
){

    const emails = await Email.find({
        userId: req.user.googleId,
        category: req.params.category.toLowerCase()
    });

    console.log(emails);
    res.json(emails);
}
module.exports={getEmails,getStoredEmails,getEmailsByCategory, getEmailById};
