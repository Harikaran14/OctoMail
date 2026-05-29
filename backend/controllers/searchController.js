const Email = require("../models/Email");
const generateEmbedding = require("../services/embeddingService");
const cosineSimilarity = require("compute-cosine-similarity");


async function semanticSearch(req,res){

    try{
        console.log("Inside semantic search ");
        const {query}=req.body;
        const queryEmbedding = await generateEmbedding(query);

        const emails= await Email.find({
            userId:req.user.googleId
        });
        
        const scoredEmails = emails.map(email=>{
            let similarity=0;
            if (email.embedding && email.embedding.length>0){
                similarity= cosineSimilarity(queryEmbedding,email.embedding);

            }
            return {...email.toObject(),similarity}

        });
        scoredEmails.sort((a,b) =>b.similarity-a.similarity);
        const topResults=scoredEmails.slice(0,5);

        res.json(topResults);

    }
    catch(err){
        console.log(err);
        res.status(500).json({
            error: "Failed Semantic search"
        });
    }
}

module.exports={semanticSearch};
