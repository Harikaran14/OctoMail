import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Sidebar(){
    const auth= useContext(AuthContext);

    return (
        <div>
            <h2>
                SideBar
            </h2>
            <p>{auth.user.name}</p>
            <p>{auth.user.email}</p>
        </div>
    )
}

export default Sidebar;
