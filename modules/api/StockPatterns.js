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

const getMostRecentPatterns = async () =>{
    const data = await axios.get(`/api/patterns/mostrecentday`)
    return data.data
}

const getRecentPatternsForAStock = async (stock,limitdays) =>{
    const data = await axios.get(`/api/patterns/recentstkpattern/` + stock + `/` + limitdays)
    return data.data
}

const getPatternPerformanceFromDate = async (stock,datefrom) =>{
    const data = await axios.get(`/api/patterns/performance/` + stock + `/` + datefrom)
    return data.data
}

const getRecentStkCntPtrnsDays = async (limitdays) =>{
    const data = await axios.get(`/api/patterns/groupbysym/` + limitdays)
    return data.data
}

const getCorrelationsByPerChange = async (stks,dur,format) =>{
    const data = await axios.get(`/api/corelation/` + dur + `/` + format + `/` + `?stks=` + stks.toString())
    return data.data
}

export {getPatternsForStock,getTopPatternsForStock,getDatesForLastTopPatterns,getPatternsByDate,getMostRecentPatterns,
        getRecentPatternsForAStock,getPatternPerformanceFromDate,getRecentStkCntPtrnsDays,getCorrelationsByPerChange}