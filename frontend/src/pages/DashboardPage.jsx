import { useEffect } from "react";
import NotificationCard from "../components/NotificationCard";
import StatCard from "../components/StatCard";
import DigestCard from "../components/DigestCard";
import EmailCard from "../components/EmailCard";
import { useNavigate } from "react-router-dom";
import useDigest from "../hooks/useDigest";
import useNotifications from "../hooks/useNotifications";
import useEmails from "../hooks/useEmails";

function DashboardPage() {
  useEffect(() => {
    console.log("Dashboard Loaded");
  }, []);

  const navigate = useNavigate();
  const { digest } = useDigest();
  const { notifications } = useNotifications();
  const { emails } = useEmails();
  

  const totalEmails = emails.length;
  const unreadNotification = notifications.filter((n) => !n.read).length;
  const highPriorityEmails = emails.filter((e) => e.priority === "High").length;
  const pendingTasks = emails.reduce((total, email) => total + email.tasks.length, 0);

  return (
    <div className="page">
      <div className="page-header">
        <h1>Dashboard</h1>
      </div>

      <section className="section">
        <h2 className="section-title">Digest</h2>
        {digest && <DigestCard digest={digest} />}
      </section>

      <section className="section">
        <h2 className="section-title">Stats</h2>
        <div className="stats-grid">
          <StatCard title="Total Emails" value={totalEmails} />
          <StatCard title="Unread Notifications" value={unreadNotification} />
          <StatCard title="High Priority" value={highPriorityEmails} />
          <StatCard title="Pending Tasks" value={pendingTasks} />
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Important Notifications</h2>
        {notifications.slice(0, 3).map((notification) => (
          <NotificationCard key={notification._id} {...notification} />
        ))}
      </section>

      <section className="section">
        <h2 className="section-title">Latest Emails</h2>
        {emails.slice(0, 3).map((email) => (
          <EmailCard
            key={email._id}
            email={email}
            onclick={() => navigate(`/emails/${email._id}`)}
          />
        ))}
      </section>
    </div>
  );
}

export default DashboardPage;
