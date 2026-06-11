const Email = require("../models/Email");
const processingSingleEmail= require("../services/emailProcessingService");
const emailQueue = require("../queues/emailQueue");
const ProcessingBatch = require("../models/ProcessingBatch");

async function processEmails (req,res){
    try{
        const emails =await Email.find({
            processed:false,
            userId: req.user.googleId
        });

        const batch = await ProcessingBatch.create({
            userId:req.user.googleId,
            totalEmails: emails.length
        });

        for (let email of emails){
            await emailQueue.add("process-email",{
                emailId: email._id.toString(),
                batchId: batch._id.toString()
            },{
                attempts:3,
                backoff: {
                    type: "exponential",
                    delay:5000
                },
                removeOnComplete:100,
                removeOnFail: 50
            });
            

        }
        res.json({message: "Emails Queued successfully for background processing",
            emailsQueued: emails.length});

    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"AI processing queueing failed"});
    }
}

async function findProcessStatus(req,res){
    try{
        const batch = await ProcessingBatch.findOne({
            userId:req.user.googleId
        }).sort({createdAt:-1});
        res.json(batch);
        console.log(batch);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Failed to show the Processing Status"});

    }
}

module.exports = {findProcessStatus,
    processEmails
};


