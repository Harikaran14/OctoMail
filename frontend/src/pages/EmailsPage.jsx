import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmailCard from "../components/EmailCard";
import useEmails from "../hooks/useEmails";
import api from "../services/api";
import { getSemanticSearch } from "../services/emailService";

function EmailsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { emails, loading, error } = useEmails();
  const [semanticResults, setSemanticResults] = useState(null);
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    priority: "all",
    category: "all",
    sender: "all",
    hasTasks: false,
    hasDeadlines: false,
    today: false,
    lastWeek: false,
  });
  const [sortBy, setSortBy] = useState("latest");

  if (loading) {
    return <h2>Loading...</h2>;
  }
  if (error) {
    return <h2>{error}</h2>;
  }

  const senders = [...new Set(emails.map((email) => email.sender))];

  async function handleSemanticSearch() {
    if (searchTerm.trim() === "") {
      setSemanticResults(null);
      return;
    }
    const data = await getSemanticSearch(searchTerm);
    setSemanticResults(data);
  }

  let displayedEmails = semanticResults ?? emails;
  displayedEmails = [...displayedEmails];

  if (filters.priority !== "all") {
    displayedEmails = displayedEmails.filter(
      (email) => email.priority?.toLowerCase() === filters.priority
    );
  }
  if (filters.category !== "all") {
    displayedEmails = displayedEmails.filter(
      (email) => email.category?.toLowerCase() === filters.category
    );
  }
  if (filters.sender !== "all") {
    displayedEmails = displayedEmails.filter((email) => email.sender === filters.sender);
  }
  if (filters.hasTasks) {
    displayedEmails = displayedEmails.filter(
      (email) => email.tasks && email.tasks.length > 0
    );
  }
  if (filters.hasDeadlines) {
    displayedEmails = displayedEmails.filter(
      (email) => email.deadlines && email.deadlines.length > 0
    );
  }
  if (filters.today) {
    const today = new Date().toISOString().split("T")[0];
    displayedEmails = displayedEmails.filter(
      (email) => new Date(email.receivedAt).toISOString().split("T")[0] === today
    );
  }
  if (filters.lastWeek) {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    displayedEmails = displayedEmails.filter(
      (email) => new Date(email.receivedAt) >= weekAgo
    );
  }
  if (sortBy === "latest") {
    displayedEmails.sort((a, b) => new Date(b.receivedAt) - new Date(a.receivedAt));
  }
  if (sortBy === "oldest") {
    displayedEmails.sort((a, b) => new Date(a.receivedAt) - new Date(b.receivedAt));
  }
  if (sortBy === "priority") {
    const weight = { high: 3, medium: 2, low: 1 };
    displayedEmails.sort(
      (a, b) =>
        (weight[b.priority?.toLowerCase()] || 0) - (weight[a.priority?.toLowerCase()] || 0)
    );
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Emails</h1>
      </div>

      <div className="filters-bar">
        <button
          className="btn-primary"
          onClick={async () => {
            await api.get("emails/fetch");
            await api.post("/ai/process");
          }}
        >
          Force Sync
        </button>
        <input
          type="text"
          placeholder="Search emails intelligently..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <button onClick={handleSemanticSearch}>Search</button>
        <button
          onClick={() => {
            setSemanticResults(null);
            setSearchTerm("");
          }}
        >
          Clear
        </button>
      </div>

      <div className="filters-bar">
        <div className="filters-group">
          <select
            value={filters.priority}
            onChange={(e) => setFilters((prev) => ({ ...prev, priority: e.target.value }))}
          >
            <option value="all">All priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <select
            value={filters.category}
            onChange={(e) => setFilters((prev) => ({ ...prev, category: e.target.value }))}
          >
            <option value="all">All categories</option>
            <option value="placement">Placement</option>
            <option value="academic">Academic</option>
            <option value="coding">Coding</option>
            <option value="shopping">Shopping</option>
            <option value="finance">Finance</option>
            <option value="newsletter">Newsletter</option>
            <option value="social">Social</option>
            <option value="other">Other</option>
          </select>
          <select
            value={filters.sender}
            onChange={(e) => setFilters((prev) => ({ ...prev, sender: e.target.value }))}
          >
            <option value="all">All senders</option>
            {senders.map((sender) => (
              <option key={sender} value={sender}>
                {sender}
              </option>
            ))}
          </select>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="priority">Priority</option>
          </select>
        </div>
        <div className="filters-checkboxes">
          <label>
            <input
              type="checkbox"
              checked={filters.hasTasks}
              onChange={() => setFilters((prev) => ({ ...prev, hasTasks: !prev.hasTasks }))}
            />
            Has tasks
          </label>
          <label>
            <input
              type="checkbox"
              checked={filters.hasDeadlines}
              onChange={() =>
                setFilters((prev) => ({ ...prev, hasDeadlines: !prev.hasDeadlines }))
              }
            />
            Has deadlines
          </label>
          <label>
            <input
              type="checkbox"
              checked={filters.today}
              onChange={() => setFilters((prev) => ({ ...prev, today: !prev.today }))}
            />
            Today
          </label>
          <label>
            <input
              type="checkbox"
              checked={filters.lastWeek}
              onChange={() => setFilters((prev) => ({ ...prev, lastWeek: !prev.lastWeek }))}
            />
            Last week
          </label>
        </div>
      </div>

      {displayedEmails.map((email) => (
        <EmailCard
          key={email._id}
          email={email}
          onclick={() => navigate(`/emails/${email._id}`)}
        />
      ))}
    </div>
  );
}

export default EmailsPage;
