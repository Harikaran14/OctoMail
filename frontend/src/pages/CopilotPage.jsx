import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { askCopilot } from "../services/copilotServices";

function CopilotPage() {
  const [searchParams] = useSearchParams();
  const emailId = searchParams.get("emailId");
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi, I'm OctoMail Copilot. How can I help?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSend() {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const userMessage = { role: "user", content: input };
      setMessages((previous) => [...previous, userMessage]);

      const response = await askCopilot(input, emailId);
      const assistantMessage = { role: "assistant", content: response.answer, sources: response.sources };
      setMessages((previous) => [...previous, assistantMessage]);
      setInput("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>OctoMail Copilot</h1>
        {emailId && <span className="mode-badge">Single email mode</span>}
      </div>

      <div className="chat-container">
        {messages.map((message, index) => (
          <div key={index} className={`chat-message ${message.role}`}>
            <strong>{message.role}</strong>
            <p>{message.content}</p>
            {message.sources && (
              <div className="chat-sources">
                <p>Sources:</p>
                {message.sources.map((source, i) => (
                  <div key={i}>{source.subject}</div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="chat-input-bar">
        <input
          value={input}
          placeholder="Ask anything about your emails..."
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button className="btn-primary" onClick={handleSend} disabled={loading}>
          {loading ? "Thinking..." : "Send"}
        </button>
      </div>
    </div>
  );
}

export default CopilotPage;
