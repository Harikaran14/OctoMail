import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import useEmails from "../hooks/useEmails";
import { getSimilarEmails } from "../services/emailService";
import EmailCard from "../components/EmailCard";

function EmailDetailPage(){
    const {id}=useParams();
    const navigate = useNavigate();
    const {emails, loading, error}= useEmails();
    const [showBody, setShowBody]=useState(false);
    const [similarEmails,setSimilarEmails]=useState([]);
    const [showSimilar,setShowSimilar]=useState(false);
    useEffect(()=>{
        setShowSimilar(false);
        setSimilarEmails([]);
    },[id]);
    if (loading){
        return (<h2>loading</h2>);
    }

    const email = emails.find(email=>email._id===id);


    if (!email){
        return (<div>Email not found</div>);
    }
    async function handleSimilarEmails(){
        if (showSimilar){
            setShowSimilar(false);
            return ;
        }
        const data =await getSimilarEmails(email._id);

        setSimilarEmails(data);
        setShowSimilar(true);


    }
    return (
        <div>
            <h1>EmailDetailPage</h1>
            <h1>Subject: {email.subject}</h1>
            <h2>Sender: {email.sender}</h2>
            <h2>Priority: {email.priority}</h2>
            <h2>Category: {email.category || "General"}</h2>
            <h3>Summary</h3>
            <h4>{email.summary}</h4>
            <h3>Tasks</h3>
            <ul>
                {
                    email.tasks.map((task,index)=>
                    <li
                        key={index}>
                            {task}
                    </li>)
                }
            </ul>
            <h3>Deadlines</h3>
            <ul>
                {email.deadlines.map((deadline,index)=>
                <li key={index}>{deadline}</li>)}
            </ul>

            <button onClick={()=>setShowBody(!showBody)}>{showBody ? "Hide Body" : "Show Body"}</button>
            {showBody &&<div>
                <h2>Original Email</h2>
            <p>{email.body}</p></div>}
            <hr></hr>
            <button onClick={()=>navigate(`/copilot?emailId=${email._id}`)}>Ask OctoMailAI</button>
            <button onClick={handleSimilarEmails}>Similar Emails</button>
            {showSimilar && 
            <div>
                <h3>Similar Emails</h3>
                {
                    similarEmails.map(
                        similarEmail=>(
                            <EmailCard key={similarEmail._id} email={similarEmail} onclick={()=>navigate(`/emails/${similarEmail._id}`)}></EmailCard>
                        )
                    )
                }
                </div>}
        </div>
    )
}

export default EmailDetailPage;
