import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Sidebar(){
    const {user,setUser,isAuthenticated,setIsAuthenticated}= useContext(AuthContext);

    return (
        <div>
            <h2>
                SideBar
            </h2>
            <button onClick={()=>{
                setUser({name:"Harikaran",email:"Hari@gmail.com"});
                setIsAuthenticated(true);

            }}>Login</button>
            <button onClick={()=>{
                setUser({name:"Demo User",email:"demo@octomail.ai"});
                setIsAuthenticated(false);

            }}>LogOut</button>
            <p>{isAuthenticated ? "Logged IN" : "Guest User"}</p>
            <p>{user.name}</p>
            <p>{user.email}</p>
            
        </div>
    )
}

export default Sidebar;
