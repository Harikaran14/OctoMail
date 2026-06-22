import useAnalytics from "../hooks/useAnalytics";
import StatCard from "../components/StatCard";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const CHART_COLORS = ["#8b5cf6", "#6366f1", "#22d3ee", "#34d399", "#fbbf24", "#f87171"];
const AXIS_STYLE = { fill: "#64748b", fontSize: 12 };
const GRID_STYLE = { stroke: "#252a3a" };
const TOOLTIP_STYLE = {
  contentStyle: {
    background: "#141722",
    border: "1px solid #252a3a",
    borderRadius: "6px",
    color: "#f1f5f9",
  },
};

function NotificationPage() {
  const {
    totalEmails,
    highPriorityEmails,
    pendingTasks,
    overdueTasks,
    categoryData,
    activityData,
    priorityData,
    topSenders,
    taskDeadlineData,
  } = useAnalytics();

  return (
    <div className="page">
      <div className="page-header">
        <h1>Analytics</h1>
      </div>

      <section className="section">
        <div className="stats-grid">
          <StatCard title="Total Emails" value={totalEmails} />
          <StatCard title="High Priority" value={highPriorityEmails} />
          <StatCard title="Pending Tasks" value={pendingTasks} />
          <StatCard title="Overdue Tasks" value={overdueTasks} />
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Email Categories</h2>
        <div className="chart-container">
          <BarChart width={700} height={300} data={categoryData}>
            <CartesianGrid strokeDasharray="3 3" stroke={GRID_STYLE.stroke} />
            <XAxis dataKey="name" tick={AXIS_STYLE} axisLine={{ stroke: "#252a3a" }} />
            <YAxis tick={AXIS_STYLE} axisLine={{ stroke: "#252a3a" }} />
            <Tooltip {...TOOLTIP_STYLE} />
            <Bar dataKey="value" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Email Activity Trend</h2>
        <div className="chart-container">
          <LineChart width={700} height={300} data={activityData}>
            <CartesianGrid strokeDasharray="3 3" stroke={GRID_STYLE.stroke} />
            <XAxis dataKey="date" tick={AXIS_STYLE} axisLine={{ stroke: "#252a3a" }} />
            <YAxis tick={AXIS_STYLE} axisLine={{ stroke: "#252a3a" }} />
            <Tooltip {...TOOLTIP_STYLE} />
            <Line type="monotone" dataKey="count" stroke="#22d3ee" strokeWidth={2} dot={{ fill: "#22d3ee" }} />
          </LineChart>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Priority Distribution</h2>
        <div className="chart-container">
          <PieChart width={400} height={300}>
            <Pie data={priorityData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
              {priorityData.map((_, index) => (
                <Cell key={index} fill={CHART_COLORS[index % CHART_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip {...TOOLTIP_STYLE} />
          </PieChart>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Top Senders</h2>
        <div className="top-senders-list">
          {topSenders.map((sender) => (
            <div key={sender.sender} className="top-sender-item">
              <span>{sender.sender}</span>
              <span>{sender.count}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Tasks & Deadlines</h2>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Task</th>
                <th>Deadline</th>
                <th>Priority</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {taskDeadlineData.map((task, index) => (
                <tr key={index}>
                  <td>{task.task}</td>
                  <td>{task.deadline}</td>
                  <td>{task.priority}</td>
                  <td>{task.subject}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default NotificationPage;
