import axios from "axios";

const BasicNewsFeeds  = async (feedTypes) =>{
    const data = await axios.get(`/newsfeed/` + (feedTypes))
    return data.data
}

export {BasicNewsFeeds}