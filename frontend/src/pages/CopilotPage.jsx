import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { askCopilot } from "../services/copilotServices";

function CopilotPage(){
    const [searchParams]= useSearchParams();
    const emailId= searchParams.get("emailId");
    const [messages,setMessages]=useState([{role: "assistant", content:"Hi I'm  OctoMail Copilot."}]);
    const [input,setInput]=useState("");
    const [loading , setLoading] = useState(false);
    async function handleSend(){
        if (!input.trim()){
            return ;}
        setLoading(true);
        try{
        const userMessage={role:"user", content:input};
        setMessages(previous=> [...previous,userMessage]);
        
        const response = await askCopilot(input,emailId);
        const assistantMessage={role:"assistant",content: response.answer};
        setMessages(previous=> [...previous,assistantMessage]);
        setInput("");

    }
    finally{
        setLoading(false);
    }
}
    return (
        <div>
            <h1>OctoMail Copilot </h1>
            {emailId && <p>
                Single Email Mode
            </p>}
            {messages.map((message,index)=>(
                <div key={index}>
                    
                    <strong>
                        {message.role}
                    </strong>
                    <p>{message.content}</p>
                    {
                        message.sources && (

                        <div>

                            <p>Sources:</p>

                            {
                            message.sources.map(
                                (source,index)=>(
                                    <div key={index}>

                                        {source.subject}

                                    </div>
                                )
                            )
                            }

                        </div>

                        )
                        }
                     </div>
            ))}
            <input value={input} onChange={(event)=> setInput(event.target.value)}></input>
            <button onClick={handleSend} disabled={loading}>{loading ? "Thinking" : "Send"}</button>
        </div>
    )
}

export default CopilotPage;
