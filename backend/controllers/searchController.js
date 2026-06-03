const Email = require("../models/Email");
const generateEmbedding = require("../services/embeddingService");


async function semanticSearch(req,res){

    try{
        console.log("Inside semantic search ");
        const {query}=req.body;
        if (
            !query ||
            typeof query !== "string" ||
            query.trim().length < 2
        ) {
            return res.status(400).json({
                error: "Invalid query"
            });
        }
        
        const queryEmbedding = await generateEmbedding(query);
        const results = await Email.aggregate([
            {
                $vectorSearch: {
                    index: "vector_index",
                    path: "embedding",
                    queryVector: queryEmbedding,
                    numCandidates: 100,
                    limit:5,
                    filter:{
                        userId: req.user.googleId
                    }
                }
            },{
                $project:{
                    subject:1,
                    sender:1,
                    summary:1,
                    priority:1,
                    tasks:1,
                    body:1,
                    receivedAt:1,

                    score:{
                        $meta: "vectorSearchScore"
                    }


                }
            },
            {

                $match: {
                    score: {
                        $gte: 0.7
                    }
                }
            }
        ]);


        res.json(results);

    }
    catch(err){
        console.log(err);
        res.status(500).json({
            error: "Failed Semantic search"
        });
    }
}

module.exports={semanticSearch};
