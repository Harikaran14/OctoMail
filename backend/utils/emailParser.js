function getHeader(headers,name){
    const header = headers.find(
        h=> h.name === name
    );
    return header ? header.value :"";
}

function decodeBase64(data){
    if (!data ) return "";
    return Buffer.from(data,"base64").toString("utf-8");
}

function extractBody(payload){

    if (payload.body?.data){
        return decodeBase64(payload.body.data);
    }
    if (payload.parts){
        for (let part of payload.parts){
            if (part.mimeType==="text/plain"){
                return decodeBase64(part.body.data);
            }
        }
    }
    return "";
}

module.exports={getHeader,extractBody};
