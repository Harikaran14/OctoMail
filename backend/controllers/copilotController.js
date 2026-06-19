const Email = require("../models/Email");
const generateEmbedding = require("../services/embeddingService");
const generateLLMResponse = require("../services/llmService");
const ChatMessage = require("../models/ChatMessage");

async function askCopilot(req,res){
    try{
        const {question , emailId }= req.body;
        if (!question){
            return res.status(400).json({
                error:"Question required"
            });

        }
        
        const history = await ChatMessage.find({
            userId:req.user.googleId
        }).sort({createdAt: -1}).limit(10);

        const convohistory = history.reverse().map(msg => `${msg.role }: ${msg.content}`).join("\n");
        let emailsForContext=[];
        if (emailId){
            const email= await Email.findOne({
                _id:emailId,
                userId:req.user.googleId}
            );
            if (!email){
                return res.status(404).json({error:"Email not found"});
            }
            emailsForContext=[email];

        }
        else{
        const questionEmbedding = await generateEmbedding(question);
        let results = await Email.aggregate([
            {
                $vectorSearch:{
                    index:"vector_index",
                        path:"embedding",
                        queryVector:questionEmbedding,
                        numCandidates:100,
                        limit:8,
                        filter:{
                            userId:req.user.googleId
                        }
                        
                }
            },
            {
                $project: {
                    sender: 1,
                    subject: 1,
                    summary: 1,
                    tasks: 1,
                    deadlines: 1,
                    priority: 1,
                    body:1,
                    category:1,
                    score: {
                        $meta: "vectorSearchScore"
                    }
                }
            }
        ]) ;

        const emailsForContext=
        results.filter(
            email => email.score > 0.8
        );
        if (emailsForContext.length === 0){
            return res.json({answer:"I couldn't find relevant email to answer your query. ",emailsUsed:0,sources:[]});
        }
    }
        const context = emailsForContext.map(email=>
            `Subject: ${email.subject}           
            Summary: ${email.summary}
            Sender: ${email.sender}
            Priority: ${email.priority}
            Body: ${email.body}
            Tasks: ${email.task.join(", ") || ""}

            `).join("\n \n");
        
        
        const prompt = `
        You are OctoMail Copilot.

        Answer ONLY using the provided email context.
        Your goal is to help users understand their inbox.

        When answering:

        - Prioritize actionable tasks.
        - Prioritize deadlines.
        - Prioritize interview, placement, work, banking, and academic emails over promotional emails.
        - If multiple tasks exist, group and rank them by importance.
        - Mention which email or sender each task came from when useful.
        1.If information is not present in the emails, say so.
        2. Never invent deadlines.
        3. Never invent tasks.
        4. Mention senders when useful.
        5. Give concise answers.
        6. Use bullet points when multiple emails are involved.

        Conversation History: 

            ${convohistory}

        Email Context:

        ${context}

        User Question:

        ${question}
        
        `;
        const answer= await generateLLMResponse(prompt);
        await ChatMessage.create({
            userId:req.user.googleId,
            role:"User",
            content:question
        });
        await ChatMessage.create({
            userId:req.user.googleId,
            role:"Assistant",
            content:answer
        });

        res.json({
            answer,
            emailsUsed: emailsForContext.length,
            sources: emailsForContext.map(
                email => ({
                    sender: email.sender,
                    subject: email.subject
                })
            )
        });

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
                error:"Copilot Not working "
            });


    }

}
async function clearChat(
    req,res
){
    try{
    await ChatMessage.deleteMany({
        userId: req.user.googleId
    });
    res.json({message: "Chat is cleared"});
}
catch(error){
    console.log(error);
    res.status(500).json({error:"Failed to clear chat"});
}
}
module.exports = {askCopilot ,clearChat };
