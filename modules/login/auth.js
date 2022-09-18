import axios from "axios";

const getLoggedInStatus = async () =>{
    let url = "/api/loggedinstatus"
    const data = await axios.get(url)
    return data
}

const logout = async () =>{
    let url = "/api/logout"
    const data = await axios.post(url)
    return data.data
}

export {getLoggedInStatus,logout}