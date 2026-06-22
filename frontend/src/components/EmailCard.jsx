function priorityBadgeClass(priority) {
  const level = priority?.toLowerCase();
  if (level === "high") return "badge badge-high";
  if (level === "medium") return "badge badge-medium";
  return "badge badge-low";
}

function EmailCard({ email, onclick }) {
  return (
    <div className="email-card" onClick={onclick}>
      <h3>{email.subject}</h3>
      <div className="email-card-meta">
        <span>From: {email.sender}</span>
        <span className={priorityBadgeClass(email.priority)}>{email.priority}</span>
      </div>
      <p className="email-card-summary">{email.summary}</p>
    </div>
  );
}

export default EmailCard;
