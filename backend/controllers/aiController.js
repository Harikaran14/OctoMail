const Email = require("../models/Email");
const processingSingleEmail= require("../services/emailProcessingService");


async function processEmails (req,res){
    try{
        const emails =await Email.find({
            processed:false,
            userId: req.user.googleId
        });

        for (let email of emails){
            await processingSingleEmail(email);
            

        }
        res.json({message: "Emails processed successfully"});

    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"AI processing failed"});
    }
}

module.exports = {
    processEmails
};


