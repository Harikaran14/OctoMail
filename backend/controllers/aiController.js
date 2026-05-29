const Email = require("../models/Email");
const summarizeEmail = require("../services/aiService");
const generateEmbedding= require("../services/embeddingService");

function delay(ms) {
    return new Promise(resolve =>
        setTimeout(resolve, ms)
    );
}

async function processEmails (req,res){
    try{
        const emails =await Email.find({
            processed:false,
            userId: req.user.googleId
        });

        for (let email of emails){
             await delay(4001);
            const aiResponse = await summarizeEmail(email.body,email.snippet, email.subject);
            let parsedResponse;
            try{
                parsedResponse= JSON.parse(aiResponse);
            }
            catch{
                parsedResponse={
                    summary:aiResponse,
                    priority:"Unknown"
                };
            }
                const text=email.body+email.subject+email.snippet;
                const embedding = await generateEmbedding(text);
                email.embedding=embedding;

                email.summary=parsedResponse.summary;
                email.priority=parsedResponse.priority;
                email.tasks=parsedResponse.tasks ||[];
                email.deadlines=parsedResponse.deadlines || [];
                email.processed=true;
                await email.save();
               
            

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


