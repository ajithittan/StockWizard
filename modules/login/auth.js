import axios from "axios";

const getLoggedInStatus = async () =>{
    let url = "/api/loggedinstatus"
    const data = await axios.get(url)
    return data
}

export {getLoggedInStatus}