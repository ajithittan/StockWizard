import axios from "axios";

const getBasicStockDetails  = async (stock) =>{
    const data = await axios.get(`/api/v2/companydetails/` + stock)
    return data.data
}

const getTopStockMovers = async () =>{
    const data = await axios.get(`/realtime/topstocks`) 
    return data.data
}

const getFullCompanyFacts = async (stksym,years) =>{
    let yearsToSend = years
    if (yearsToSend === "ALL") {yearsToSend = 0}
    const data = await axios.get(`/api/v2/completecompanyfacts/` + stksym + `/` + yearsToSend) 
    return data.data
}

const getCompanyKeyStats = async (statType,stksym,years,repType) =>{
    const data = await axios.get(`/api/v2/companystats/` + statType + `/` + stksym + `/` + years + `/` + repType) 
    return data.data
}

const getMasterListOfCompanyFacts = async () =>{
    const data = await axios.get(`/api/v2/companystats/allfacts`) 
    return data.data
}

const getRawCompanyStatsByType = async (statType,stksym,repType) =>{
    const data = await axios.get(`/api/v2/rawcompanystats/` + statType + `/` + stksym + `/` + repType) 
    return data.data
}

export {getBasicStockDetails,getTopStockMovers,getFullCompanyFacts,getCompanyKeyStats,getMasterListOfCompanyFacts,getRawCompanyStatsByType}