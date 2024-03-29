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

const updMasterListOfCompanyFacts  = async (updsection) =>{
    let url = "/api/v2/companystats/updfacts"
    const data = await axios.post(url,updsection)
    return data.data
}

const uploadSecDatatoDB  = async (stksym) =>{
    let url = "/api/v2/companystats/addsecdata" + `/` + stksym
    const data = await axios.post(url)
    return data.data
}

const getCompanyProfile = async (stksym) =>{
    let url = "/realtime/stockinfo" + `/` + stksym
    const data = await axios.get(url)
    return data.data
}

export {getBasicStockDetails,getTopStockMovers,getFullCompanyFacts,getCompanyKeyStats,getCompanyProfile,
    getMasterListOfCompanyFacts,getRawCompanyStatsByType,updMasterListOfCompanyFacts,uploadSecDatatoDB}