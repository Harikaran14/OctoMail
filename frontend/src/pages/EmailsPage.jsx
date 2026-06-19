import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmailCard from "../components/EmailCard";
import useEmails from "../hooks/useEmails";
import api from "../services/api";
import { getSemanticSearch } from "../services/emailService";

function EmailsPage(){
    const [searchTerm,setSearchTerm]=useState("");
    const {emails , loading , error} = useEmails();
    const [semanticResults,setSemanticResults]=useState(null);
    const navigate=useNavigate();
    if (loading){
        return (<h2>Loading...</h2>)

    }
    if (error){
        return (<h2>{error}</h2>)
    }
   // const filteredEmails= emails.filter(email=>
  //      email.subject.toLowerCase().includes(searchTerm.toLowerCase())
  //  );
  async function handleSemanticSearch(){
    if (searchTerm.trim()===""){
        setSemanticResults(null);
        return;
    }
    const data =await getSemanticSearch(searchTerm);
    setSemanticResults(data);
    
  }
  const filteredEmails= semanticResults ?? emails;
    
    return (
        <div>
            <h1>Emails</h1>
            <button onClick={async ()=>{ const resp=await api.post("/ai/process");}}>Force Sync</button>
            <input 
                type="text"
                placeholder="Search emails inteligently"
                value={searchTerm}
                onChange={(event)=>setSearchTerm(event.target.value)}
            ></input>
            <button onClick={handleSemanticSearch}>Search</button>
            {filteredEmails.map(email=>(
                <EmailCard key={email._id} email={email} onclick={()=>navigate(`/emails/${email._id}`)}></EmailCard>
            ))}
        </div>
    )
}

export default EmailsPage;
