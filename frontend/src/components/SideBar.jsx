import useAuth from "../context/useAuth";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const { user, isAuthenticated, login, logout } = useAuth();

  return (
    <aside className="sidebar">
      <h2 className="sidebar-brand">
        Octo<span>Mail</span>
      </h2>
      <hr className="sidebar-divider" />
      <nav className="sidebar-nav">
        <NavLink to="/" end className={({ isActive }) => `sidebar-link${isActive ? " active" : ""}`}>
          Dashboard
        </NavLink>
        <NavLink to="/emails" className={({ isActive }) => `sidebar-link${isActive ? " active" : ""}`}>
          Emails
        </NavLink>
        <NavLink to="/copilot" className={({ isActive }) => `sidebar-link${isActive ? " active" : ""}`}>
          Copilot
        </NavLink>
        <NavLink to="/notification" className={({ isActive }) => `sidebar-link${isActive ? " active" : ""}`}>
          Analytics
        </NavLink>
      </nav>
      <div className="sidebar-user">
        <p className="sidebar-user-status">{isAuthenticated ? "Logged in" : "Guest user"}</p>
        {isAuthenticated ? (
          <>
            <p className="sidebar-user-name">{user.name}</p>
            <p className="sidebar-user-email">{user.email}</p>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <p className="sidebar-user-name">Demo User</p>
            <p className="sidebar-user-email">DemoMail.octomail.ai</p>
            <button className="btn-primary" onClick={login}>
              Sign in with Google
            </button>
          </>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
