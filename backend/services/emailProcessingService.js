
const Email = require("../models/Email");
const generateEmbedding= require("../services/embeddingService");
const generateLLMResponse = require("../services/llmService");
const createNotificationForEmail = require("./notificationService");

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
    "priority": "High/Medium/Low",lowercase
    "category": "string",lowercase
    "tasks": [],
    "deadlines": [],in Date() format
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
        

        email.summary=parsedResponse.summary;
        email.priority=parsedResponse.priority.toLowerCase() || "unknown";
        email.tasks=parsedResponse.tasks ||[];
        email.deadlines=parsedResponse.deadlines || [];
        email.category= parsedResponse.category.toLowerCase() || "other";
        email.processed=true;
        const text = `
Subject: ${email.subject}

Sender: ${email.sender}

Summary: ${email.summary}

Body: ${email.body}
`;
        
        const embedding = await generateEmbedding(text);
        email.embedding=embedding;
        await email.save();
        await createNotificationForEmail(email);
                

}
module.exports=processingSingleEmail;
