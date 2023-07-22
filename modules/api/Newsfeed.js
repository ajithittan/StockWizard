import axios from "axios";

const BasicNewsFeeds  = async (feedTypes) =>{
    const data = await axios.get(`/newsfeed/` + (feedTypes))
    return data.data
}

const StockNewsFeeds  = async (stksym) =>{
    const data = await axios.get(`/api/v2/news/` + stksym)
    return data.data
}

const MultipleStockNews = async (arrStks) =>{
    const data = await axios.get(`/api/v2/multinews/`,{
        params: { stkList: arrStks + ''}
        })
    return data.data
}

export {BasicNewsFeeds,StockNewsFeeds,MultipleStockNews}