function NotificationCard({ title, message, type }) {
  return (
    <div className="notification-card">
      <h3>{title}</h3>
      <p className="notification-message">{message}</p>
      <span className="notification-type">{type}</span>
    </div>
  );
}

export default NotificationCard;
