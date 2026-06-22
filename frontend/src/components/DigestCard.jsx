function DigestCard({ digest }) {
  return (
    <div className="digest-card">
      <h2>Daily Digest</h2>
      <p className="digest-date">{digest.date}</p>
      <p className="digest-content">{digest.content}</p>
    </div>
  );
}

export default DigestCard;
