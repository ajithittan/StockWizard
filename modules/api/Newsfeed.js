import axios from "axios";

const BasicNewsFeeds  = async (feedTypes) =>{
    const data = await axios.get(`/newsfeed/` + (feedTypes))
    return data.data
}

const StockNewsFeeds  = async (stksym) =>{
    const data = await axios.get(`/api/v2/news/` + stksym)
    return data.data
}

export {BasicNewsFeeds,StockNewsFeeds}