import api from "./api";

export async function getTodayDigest(){
    const response = await  api.get("/digest/today");
    return response.data;

}

