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
    const [filters, setFilters]=useState({
        priority:"all",
        category:"all",
        sender:"all",
        hasTasks:false,
        hasDeadlines: false,
        today:false,
        lastweek:false
    });
    const[sortBy,setSortBy]=useState("latest");

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
  const displayedEmails= semanticResults ?? emails;
  if (filters.priority!=="all"){
    displayedEmails=displayedEmails.filter(email=>email.priority?.toLowerCase()===filters.priority);
  }
  if(
    filters.category !==
    "all"
){

    displayedEmails =
    displayedEmails.filter(

        email =>

        email.category
        ?.toLowerCase()

        ===

        filters.category

    );

}if(
    filters.sender !==
    "all"
){

    displayedEmails =
    displayedEmails.filter(

        email =>

        email.sender ===
        filters.sender

    );

}
if(
    filters.hasTasks
){

    displayedEmails =
    displayedEmails.filter(

        email =>

        email.tasks &&
        email.tasks.length > 0

    );

}
if(
    filters.hasDeadlines
){

    displayedEmails =
    displayedEmails.filter(

        email =>

        email.deadlines &&
        email.deadlines.length > 0

    );

}
if(
    filters.today
){

    const today =
    new Date()
    .toISOString()
    .split("T")[0];

    displayedEmails =
    displayedEmails.filter(

        email =>

        new Date(
            email.receivedAt
        )
        .toISOString()
        .split("T")[0]

        ===

        today

    );

}
if(
    filters.lastWeek
){

    const weekAgo =
    new Date();

    weekAgo.setDate(
        weekAgo.getDate()-7
    );

    displayedEmails =
    displayedEmails.filter(

        email =>

        new Date(
            email.receivedAt
        ) >= weekAgo

    );

}
    return (
        <div>
            <h1>Emails</h1>
            <button onClick={async ()=>{ const fetch= await api.get("emails/fetch"); const resp=await api.post("/ai/process");}}>Force Sync</button>
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
