import axios from "axios";
import uniq from 'lodash/uniq';

const BasicNewsFeeds  = async (feedTypes) =>{
    const data = await axios.get(`/newsfeed/` + (feedTypes))
    return data.data
}

const StockNewsFeeds  = async (stksym) =>{
    const data = await axios.get(`/api/v2/news/` + stksym)
    let retval = null
    //remove duplicates
    if(data.data){
        retval = uniq(data.data,"title")
    }
    return retval
}

const MultipleStockNews = async (arrStks) =>{
    const data = await axios.get(`/api/v2/multinews/`,{
        params: { stkList: arrStks + ''}
        })
    return data.data
}

export {BasicNewsFeeds,StockNewsFeeds,MultipleStockNews}