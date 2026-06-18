import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmailCard from "../components/EmailCard";
import mockEmails from "../mock/mockEmails";

function EmailsPage(){
    const [searchTerm,setSearchTerm]=useState("");
    const filteredEmails= mockEmails.filter(email=>
        email.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const navigate=useNavigate();
    return (
        <div>
            <h1>Emails</h1>
            <input 
                type="text"
                placeholder="Search emails inteligently"
                value={searchTerm}
                onChange={(event)=>setSearchTerm(event.target.value)}
            ></input>
            {filteredEmails.map(email=>(
                <EmailCard key={email._id} email={email} onclick={()=>navigate(`/emails/${email._id}`)}></EmailCard>
            ))}
        </div>
    )
}

export default EmailsPage;
