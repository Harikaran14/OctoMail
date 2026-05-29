const {GoogleGenerativeAI} = require("@google/generative-ai")
const genAI= new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
    model:"gemini-3.1-flash-lite"
});

async function summarizeEmail(emailBody,snippet,subject){

   const prompt = `
You are intelligent email productivity assistant.

Analyze the following email.

Return ONLY valid JSON.

Format:
{
  "summary": "",
  "priority": "High/Medium/Low",
  "tasks": [],
  "deadlines": []
}

Rules:
- Extract actionable tasks.
- Extract dates/deadlines if present.
- If none exist, return empty arrays for tasks,deadlines.

Email:
${emailBody}

Snippet:
${snippet}

Subject:
${subject}
`;

    const result =await model.generateContent(prompt);
    let response = result.response.text();

    response = response.replace(/```json/g, "").replace(/```/g, "").trim();

    return response;
}

module.exports = summarizeEmail;
