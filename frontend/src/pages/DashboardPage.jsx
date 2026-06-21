import { useEffect } from "react";
import mockNotifications from "../mock/mockNotifications";
import NotificationCard from "../components/NotificationCard";
import StatCard from "../components/StatCard";
import mockEmails from "../mock/mockEmails";
import DigestCard from "../components/DigestCard";
import mockDigest from "../mock/mockDigest";
import EmailCard from "../components/EmailCard";
import { useNavigate } from "react-router-dom";
import useDigest from "../hooks/useDigest";
import useNotifications from "../hooks/useNotifications";
import useEmails from "../hooks/useEmails";
function DashboardPage(){

    useEffect(()=>{
        console.log("Dashboard Loaded");

    },[]);
    const navigate = useNavigate();
    const { digest} = useDigest();
    const { notifications } = useNotifications();
    const { emails }= useEmails();

    const totalEmails= emails.length;
    const unreadNotification= notifications.filter(notification => !notification.read).length;
    const highPriorityEmails= emails.filter(email=> email.priority=="High").length;
    const pendingTasks=emails.reduce((total,email)=>total+email.tasks.length,0);
    
    return (
        <div>
            <h1>DashBoard</h1>


            <h2>Digest</h2>
            {digest && <DigestCard digest={digest}></DigestCard>}
            <h2>STATS</h2>
            

            <StatCard title="Total Emails" value={totalEmails}></StatCard>
            <StatCard title="Unread Notification" value={unreadNotification}></StatCard>
            <StatCard title="High Priority Emails" value={highPriorityEmails}></StatCard>
            <StatCard title="Pending Tasks" value={pendingTasks}></StatCard>
            <h2>Recent Important Emails </h2>
            {notifications.slice(0,3).map(
                notification=>(
                    <NotificationCard key={notification._id} {...notification}></NotificationCard>
                )
            )
            }
            <h2>Latest Emails</h2>
            {emails.slice(0,3).map(
                email=>(
                    <EmailCard key={email._id} email={email} onclick={()=>navigate(`/emails/${email._id}`)}></EmailCard>
                )
            )}

            
        </div>
    );
}

export default DashboardPage;