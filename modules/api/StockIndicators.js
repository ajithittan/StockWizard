import axios from "axios";

const getSimpleMovingAverages  = async (stock,onlyLast) =>{
    const data = await axios.get(`/api/stocksignals/indicators/` + stock + `/SMA/` + onlyLast)
    return data.data
}

const getRollingSMA  = async (stock,duration) =>{
    const data = await axios.get(`/api/indicators/` + stock + `/SMA/` + duration)
    return data.data
}

export {getSimpleMovingAverages,getRollingSMA}