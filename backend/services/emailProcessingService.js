
const Email = require("../models/Email");
const generateEmbedding= require("../services/embeddingService");
const generateLLMResponse = require("../services/llmService");

function delay(ms) {
    return new Promise(resolve =>
        setTimeout(resolve, ms)
    );
}
async function processingSingleEmail(email){
    await delay(4001);
    const prompt = `
    You are intelligent email productivity assistant.

    Analyze the following email.

    Return ONLY valid JSON.

    Do not include:
    - markdown
    - explanations
    - code fences
    - text before or after JSON

    Valid categories:

    Placement
    Academic
    Coding
    Shopping
    Finance
    Newsletter
    Social
    Other

    Format:
    {
    "summary": "string",
    "priority": "High/Medium/Low",
    "category": "string"
    "tasks": [],
    "deadlines": []
    }

    Rules:
    - Extract actionable tasks.
    - Extract dates/deadlines if present.
    - If none exist, return empty arrays for tasks,deadlines.
    Email:
    ${email.body}

    Snippet:
    ${email.snippet}

    Subject:
    ${email.subject}
    `;

    const aiResponse = await generateLLMResponse(prompt);
    let parsedResponse;
    try{
        parsedResponse= JSON.parse(aiResponse);
    }
    catch{
        parsedResponse={
            summary:aiResponse,
            priority:"unknown"
        };
    }
        const text=email.body+email.subject+email.snippet;
        const embedding = await generateEmbedding(text);
        email.embedding=embedding;

        email.summary=parsedResponse.summary;
        email.priority=parsedResponse.priority.toLowerCase();
        email.tasks=parsedResponse.tasks ||[];
        email.deadlines=parsedResponse.deadlines || [];
        email.category= parsedResponse.category || "Other";
        email.processed=true;
        await email.save();
                

}
module.exports=processingSingleEmail;
