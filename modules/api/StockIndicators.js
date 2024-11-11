import axios from "axios";

const getSimpleMovingAverages  = async (stock,onlyLast) =>{
    const data = await axios.get(`/api/stocksignals/indicators/` + stock + `/SMA/` + onlyLast)
    return data.data
}

const getRollingSMA  = async (stock,indVal,duration) =>{
    const data = await axios.get(`/api/indicators/` + stock + `/SMA/` + indVal + `/` + duration)
    return data.data
}

const getSupportResistanace  = async (stock) =>{
    const data = await axios.get(`/api/stocksignals/suppresistance/` + stock)
    return data.data
}

const getSearchResults = async (searchParams) =>{
    let url = "/api/stocksignals/searchdataset"
    const data = await axios.post(url,searchParams)
    return data.data
}

export {getSimpleMovingAverages,getRollingSMA,getSupportResistanace,getSearchResults}