
import useAuth from "../context/useAuth";
import { Link } from "react-router-dom";

function Sidebar(){
    const {user,isAuthenticated,login,logout}= useAuth();

    return (
        <div>
            <h2>
                OctoMail
            </h2>
            <hr/>
            <Link to="/">DashBoard</Link>
            <Link to="/emails">Emails</Link>
            <Link to="/copilot">Copilot</Link>
            <Link to="/notification">Notification</Link>
            {isAuthenticated 
            ? 
            <button onClick={logout}>Logout</button>
            :
            <button onClick={login}>LogIn</button>
            }
            <p>{isAuthenticated ? "Logged IN" : "Guest User"}</p>
            <p>{user.name}</p>
            <p>{user.email}</p>
            
        </div>
    )
}

export default Sidebar;
