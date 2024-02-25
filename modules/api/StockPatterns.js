import axios from "axios";

const getPatternsForStock  = async (stock) =>{
    const data = await axios.get(`/realtime/stockpatterns/` + stock)
    return data.data
}

const getTopPatternsForStock = async (limitrows) =>{
    const data = await axios.get(`/api/patterns/all/` + limitrows)
    return data.data
}

const getDatesForLastTopPatterns = async (limitdays) =>{
    const data = await axios.get(`/api/patterns/dates/` + limitdays)
    return data.data
}

const getPatternsByDate = async (inpdate) =>{
    const data = await axios.get(`/api/patterns/bydate/` + inpdate)
    return data.data
}

export {getPatternsForStock,getTopPatternsForStock,getDatesForLastTopPatterns,getPatternsByDate}