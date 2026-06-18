import { useEffect } from "react";
import mockNotifications from "../mock/mockNotifications";
import NotificationCard from "../components/NotificationCard";
import StatCard from "../components/StatCard";
import mockEmails from "../mock/mockEmails";
import DigestCard from "../components/DigestCard";
import mockDigest from "../mock/mockDigest";
import EmailCard from "../components/EmailCard";
import { useNavigate } from "react-router-dom";
function DashboardPage(){

    useEffect(()=>{
        console.log("Dashboard Loaded");

    },[]);
    const totalEmails= mockEmails.length;
    const unreadNotification= mockNotifications.filter(notification => !notification.read).length;
    const highPriorityEmails= mockEmails.filter(email=> email.priority=="High").length;
    const pendingTasks=mockEmails.reduce((total,email)=>total+email.tasks.length,0);
    const navigate = useNavigate();
    return (
        <div>
            <h1>DashBoard</h1>


            <h2>Digest</h2>
            <DigestCard digest={mockDigest}></DigestCard>
            <h2>STATS</h2>
            

            <StatCard title="Total Emails" value={totalEmails}></StatCard>
            <StatCard title="Unread Notification" value={unreadNotification}></StatCard>
            <StatCard title="High Priority Emails" value={highPriorityEmails}></StatCard>
            <StatCard title="Pending Tasks" value={pendingTasks}></StatCard>
            <h2>Recent Notifications</h2>
            {mockNotifications.map(
                notification=>(
                    <NotificationCard key={notification._id} {...notification}></NotificationCard>
                )
            )
            }
            <h2>Recent Emails</h2>
            {mockEmails.slice(0,3).map(
                email=>(
                    <EmailCard key={email._id} email={email} onclick={()=>navigate(`/emails/${email._id}`)}></EmailCard>
                )
            )}

            
        </div>
    );
}

export default DashboardPage;