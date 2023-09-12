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

const getCompanyRevenue = async (stksym,years,repType) =>{
    let yearsToSend = years
    if (yearsToSend === "ALL") {yearsToSend = 0}
    const data = await axios.get(`/api/v2/companyrevenues/` + stksym + `/` + yearsToSend + `/` + repType) 
    return data.data
}

export {getBasicStockDetails,getTopStockMovers,getFullCompanyFacts,getCompanyRevenue}