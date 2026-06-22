import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useEmails from "../hooks/useEmails";
import { getSimilarEmails } from "../services/emailService";
import EmailCard from "../components/EmailCard";

function priorityBadgeClass(priority) {
  const level = priority?.toLowerCase();
  if (level === "high") return "badge badge-high";
  if (level === "medium") return "badge badge-medium";
  return "badge badge-low";
}

function EmailDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { emails, loading, error } = useEmails();
  const [showBody, setShowBody] = useState(false);
  const [similarEmails, setSimilarEmails] = useState([]);
  const [showSimilar, setShowSimilar] = useState(false);

  useEffect(() => {
    setShowSimilar(false);
    setSimilarEmails([]);
  }, [id]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  const email = emails.find((e) => e._id === id);

  if (!email) {
    return <div className="page"><h2>Email not found</h2></div>;
  }

  async function handleSimilarEmails() {
    if (showSimilar) {
      setShowSimilar(false);
      return;
    }
    const data = await getSimilarEmails(email._id);
    setSimilarEmails(data);
    setShowSimilar(true);
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>{email.subject}</h1>
        <div className="detail-meta">
          <span className="badge">{email.sender}</span>
          <span className={priorityBadgeClass(email.priority)}>{email.priority}</span>
          <span className="badge badge-low">{email.category || "General"}</span>
        </div>
      </div>

      <div className="detail-section">
        <h3>Summary</h3>
        <p>{email.summary}</p>
      </div>

      {email.tasks.length > 0 && (
        <div className="detail-section">
          <h3>Tasks</h3>
          <ul>
            {email.tasks.map((task, index) => (
              <li key={index}>{task}</li>
            ))}
          </ul>
        </div>
      )}

      {email.deadlines.length > 0 && (
        <div className="detail-section">
          <h3>Deadlines</h3>
          <ul>
            {email.deadlines.map((deadline, index) => (
              <li key={index}>{deadline}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="detail-actions">
        <button onClick={() => setShowBody(!showBody)}>
          {showBody ? "Hide body" : "Show body"}
        </button>
        <button className="btn-primary" onClick={() => navigate(`/copilot?emailId=${email._id}`)}>
          Ask OctoMail AI
        </button>
        <button onClick={handleSimilarEmails}>
          {showSimilar ? "Hide similar" : "Similar emails"}
        </button>
      </div>

      {showBody && (
        <div className="detail-section">
          <h3>Original email</h3>
          <div className="email-body">{email.body}</div>
        </div>
      )}

      {showSimilar && (
        <section className="section">
          <h2 className="section-title">Similar emails</h2>
          {similarEmails.map((similarEmail) => (
            <EmailCard
              key={similarEmail._id}
              email={similarEmail}
              onclick={() => navigate(`/emails/${similarEmail._id}`)}
            />
          ))}
        </section>
      )}
    </div>
  );
}

export default EmailDetailPage;
