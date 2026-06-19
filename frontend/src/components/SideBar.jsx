
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
            <p>{isAuthenticated ? "Logged IN" : "Guest User"}</p>
            {isAuthenticated
            ?(
            <>
            <p>{user.name}</p>
            <p>{user.email}</p>
            <button onClick={logout}>Logout</button>
            </>)
            :
            (<>
            <p>Demo User</p>
            <p>DemoMail.octomail.ai</p>
            <button onClick={login}>Sign In with Google</button>
            </>)
            }
            
            
        </div>
    )
}

export default Sidebar;
