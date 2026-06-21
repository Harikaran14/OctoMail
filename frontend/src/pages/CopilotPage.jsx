import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { askCopilot } from "../services/copilotServices";

function CopilotPage(){
    const [searchParams]= useSearchParams();
    const emailId= searchParams.get("emailId");
    const [messages,setMessages]=useState([{role: "assistant", content:"Hi I'm  OctoMail Copilot."}]);
    const [input,setInput]=useState("");

    async function handleSend(){
        if (!input.trim()){
            return ;}
        
        const userMessage={role:"user", content:input};
        const response = await askCopilot(input,emailId);
        const assistantMessage={role:"assistant",content: response.answer};
        setMessages(previous=> [...previous,userMessage,assistantMessage]);
        setInput("");

    }
    return (
        <div>
            <h1>OctoMail Copilot </h1>
            {emailId && <p>
                Email Context:
                {emailId}
            </p>}
            {messages.map((message,index)=>(
                <div key={index}>
                    
                    <strong>
                        {message.role}
                    </strong>
                    <p>{message.content}</p>
                    
                     </div>
            ))}
            <input value={input} onChange={(event)=> setInput(event.target.value)}></input>
            <button onClick={handleSend}>Send</button>
        </div>
    )
}

export default CopilotPage;
