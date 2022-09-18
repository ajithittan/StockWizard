import axios from "axios";

const getSimpleMovingAverages  = async (stock,onlyLast) =>{
    const data = await axios.get(`/api/stocksignals/indicators/` + stock + `/SMA/` + onlyLast)
    return data.data
}

export {getSimpleMovingAverages}