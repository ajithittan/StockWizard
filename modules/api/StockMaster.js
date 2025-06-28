import axios from "axios";

const getStockDetailsForStks  = async (inpList) =>{
    const data = await axios.get(`/api/stocks`,{
        params: { stkList: inpList + ''}
        })
    return data.data
}

const StockPrice = async (stock,duration) =>{
    let url = "/api/stocks/" + stock + "/" + duration
    const data = await axios.get(url)
    return data.data
    
}

const StockPriceV2  = async (inpList) =>{
    const data = await axios.get(`/realtime/stockquotes`,{
        params: { stkList: inpList + ''}
        })
    return data.data
}

const StockPerChange = async (stock,duration,rollup,unit,byType) =>{
    let url = "/api/v2/stocks/perchange/" + stock + "/" + duration + "/" + rollup + "/" + unit  + "/" + byType 
    const data = await axios.get(url)
    return data.data
}
const SectorStockPerChange = async (stock,duration,rollup,unit,byType) =>{
    let url = "/api/v2/stocks/secperchange/" + stock + "/" + duration + "/" + rollup + "/" + unit  + "/" + byType 
    const data = await axios.get(url)
    return data.data
}

const StockSector = async () =>{
    let url = "/api/v2/sectors"
    const data = await axios.get(url)
    return data.data
}

const CreateStockSector = async (sector) =>{
    let url = "/api/v2/sectors"
    const data = await axios.post(url,sector)
    return data.data
}

const DeleteStockSector = async (sectorId) =>{
    let url = "/api/v2/delsectors/" + sectorId
    const data = await axios.post(url)
    return data
}

const UpdateStockSectors = async (sector) =>{
    let url = "/api/v2/updsectors"
    const data = await axios.post(url,sector)
    return data
}

const UpdateStockPrice = async () =>{
    let url = "/api/v2/syncstkprices"
    const data = await axios.post(url)
    return data
}

const SaveNewPositions = async (newPos) =>{

    let url = "/api/v2/savepositions"
    const data = await axios.post(url,newPos)
    return data.data
}

const DeleteStkFromPositions = async (newPos) =>{

    let url = "/api/v2/deletestkpos/" + newPos
    const data = await axios.post(url)
    return data.data
}

const checkValidStock = async (stk) =>{
    let url = "/api/v2/checkvalidstock/" + stk
    const data = await axios.get(url)
    return data.data
}

const getCompanyDetails = async (stk) =>{
    let url = "/api/v2/companydetails/" + stk
    const data = await axios.get(url)
    return data.data
}

const getCompanyQtrPerf = async (stk,forChart) =>{
    let url = "/api/v2/compqtrperf/" + stk + "/" + forChart
    const data = await axios.get(url)
    return data.data
}

const StockList = async () =>{
    const data = await axios.get(`/api/stocks/v2`)
    return data.data
}

const PrioritizeStockList = async (inpList,numberofstks) =>{
    const data = await axios.get("/api/stocks/limit/" + numberofstks ,{
        params: { stkList: inpList + ''}
        })
    return data.data
}

const FullStockList = async () =>{
    const data = await axios.get(`/api/allstocks`)
    return data.data
}

const initiateCaching = async (stock,identifiers) =>{
    let url = "/api/v2/initiatecaching/" + stock
    const data = await axios.post(url,identifiers)
    return data.data
}

const getTickDataIntraDay = async (stock,timemins) =>{
    let url = "/realtime/intradaytick/" + stock + "/" + timemins
    const data = await axios.get(url)
    return data.data
}

export {StockPrice,StockPerChange,StockSector,CreateStockSector,DeleteStockSector,
    SectorStockPerChange,UpdateStockSectors,UpdateStockPrice,SaveNewPositions,DeleteStkFromPositions,checkValidStock,
    getCompanyDetails,getCompanyQtrPerf,StockList,getStockDetailsForStks,PrioritizeStockList,StockPriceV2,FullStockList,
    initiateCaching,getTickDataIntraDay}