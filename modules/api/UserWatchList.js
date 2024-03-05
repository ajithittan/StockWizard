import axios from "axios";

const saveWatchList  = async (inpVals) =>{
    let url = "/personalize/createwatchlist"
    const data = await axios.post(url,inpVals)
    return data.data
}

const getWatchList = async () =>{
    let url = "/personalize/watchlist"
    const data = await axios.get(url)
    return data.data
}

export {saveWatchList,getWatchList}