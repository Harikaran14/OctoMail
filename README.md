# 📬 OctoMail – AI-Powered Smart Inbox Productivity Assistant

OctoMail is a full-stack AI-powered email productivity assistant built using the **MERN stack**, **Gmail API**, and **LLM-based semantic processing**.
It intelligently summarizes emails, extracts tasks & deadlines, classifies priorities, enables semantic inbox search using embeddings, and generates daily productivity insights.

Designed as a **production-style applied AI system**, InboxIQ demonstrates modern **LLM integration, vector search, async pipelines, and scalable backend architecture**.

---

# 🚀 Features

## 🔐 Authentication

* Google OAuth 2.0 login
* Secure access token handling
* Gmail permission-based inbox access

## 📥 Email Intelligence Pipeline

* Fetch unread & recent emails from Gmail API
* Decode base64 email payloads
* Clean HTML email content
* Thread-aware processing support

## 🤖 AI-Powered Processing

* Email summarization (LLM)
* Priority classification (High / Medium / Low)
* Task extraction
* Deadline detection
* Smart reply generation

## 🔎 Semantic Inbox Search (Vector Search)

* Generate embeddings for email content
* MongoDB Atlas vector indexing
* Search emails by meaning instead of keywords

Example:

```
show emails about deadlines
```

Returns relevant emails even without keyword matches.

## 📊 Analytics Dashboard

Visual insights including:

* Priority distribution
* Email frequency trends
* Top senders
* Task detection statistics
* Daily inbox activity summary

## 🗓 Daily Digest Generator

Automatically generates:

```
Today's Summary:

2 urgent emails
3 action-required tasks
5 informational emails
```

## 🧠 Email Clustering

Automatically groups emails into categories like:

* Work
* Finance
* Shopping
* Meetings
* Deadlines

Using semantic similarity.

---

# 🏗 Tech Stack

## Frontend

* React.js
* Axios
* React Router
* Recharts

## Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose

## Authentication

* Google OAuth 2.0
* Passport.js

## AI Layer

* OpenAI / Gemini APIs
* Prompt-engineered structured outputs
* Email summarization
* Task extraction
* Priority classification

## Vector Search

* Embeddings generation
* MongoDB Atlas Vector Index
* Semantic similarity retrieval

## Scheduling

* node-cron background jobs
* automated email processing pipeline
* daily digest generation

---

# 🧠 System Architecture

```
React Dashboard
        ↓
Express Backend API
        ↓
Google OAuth Authentication
        ↓
Gmail API Email Fetching
        ↓
Email Cleaning Pipeline
        ↓
LLM Processing Layer
        ↓
Embeddings Generator
        ↓
MongoDB Storage + Vector Index
        ↓
Semantic Search + Analytics Dashboard
```

---

# 📂 Project Structure

```
InboxIQ
│
├── frontend
│   ├── components
│   ├── pages
│   ├── hooks
│   └── services
│
├── backend
│   ├── routes
│   ├── controllers
│   ├── services
│   ├── middleware
│   ├── models
│   └── utils
│
└── README.md
```

---

# ⚙️ Installation

## Clone repository

```
git clone https://github.com/yourusername/inboxiq.git
cd inboxiq
```

---

## Backend setup

```
cd backend
npm install
npm start
```

---

## Frontend setup

```
cd frontend
npm install
npm start
```

---

# 🔑 Environment Variables

Create `.env` file inside backend folder:

```
PORT=5000

MONGO_URI=your_mongodb_connection_string

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

OPENAI_API_KEY=your_api_key
```

---

# 📡 API Endpoints

## Authentication

```
GET /auth/google
GET /auth/google/callback
```

## Emails

```
GET /emails/fetch
GET /emails/summaries
GET /emails/tasks
```

## AI Features

```
POST /emails/summarize
POST /emails/reply
POST /emails/search
```

## Analytics

```
GET /analytics/dashboard
```

---

# 🔎 Semantic Search Example

Example query:

```
Find emails about assignment deadlines
```

Workflow:

```
Query → Embedding → Vector Similarity Search → Matching Emails
```

---

# 🧪 Example AI Output Format

```
{
  summary: "Meeting moved to tomorrow at 4 PM",
  priority: "High",
  tasks: ["Attend meeting"],
  deadlines: ["Tomorrow 4 PM"]
}
```

---

# 📈 Future Enhancements

* Thread-level summarization
* Calendar integration
* Slack / WhatsApp notifications
* Mobile responsive dashboard
* Multi-account inbox support
* RAG-based conversational inbox assistant

---

# 🎯 Learning Outcomes

This project demonstrates:

* Full-stack MERN architecture
* Gmail API integration
* OAuth authentication workflows
* Prompt engineering with structured outputs
* Vector embeddings & semantic retrieval
* MongoDB aggregation pipelines
* Background scheduling systems
* Applied LLM system design

---

# 👨‍💻 Author

**Harikaran C**

Built as a flagship applied AI full-stack project showcasing modern LLM-powered productivity automation systems.
