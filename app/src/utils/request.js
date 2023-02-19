import { api } from "../config/axios";

export const postReq = async (uri, body) =>{
    const {data} = await api.post(uri,body);
    return data
}

export const putReq = async (uri, body) =>{
    const {data} = await api.put(uri,body);
    return data
}
