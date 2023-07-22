import axios from "axios";

const googleSuccessfulAuth = async (credentials) =>{
    let url = "/api/auth/google"
    const data = await axios.post(url,credentials)
    return data
}

export {googleSuccessfulAuth}