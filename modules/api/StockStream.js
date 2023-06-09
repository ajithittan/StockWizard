import axios from "axios";

const initiateStreaming = async (stks) =>{
    let url = "/stream/initiate"
    const data = await axios.post(url,stks)
    return data.data
}

export {initiateStreaming}


