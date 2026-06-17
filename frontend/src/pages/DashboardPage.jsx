import { useEffect } from "react";

function DashboardPage(){

    useEffect(()=>{
        console.log("Dashboard Loaded");

    },[]);
    return (
        <div>
            <h1>DashBoard</h1>
        </div>
    );
}

export default DashboardPage;