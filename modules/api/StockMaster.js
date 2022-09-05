import axios from "axios";

const ListOfStocks  = async () =>{
    const data = await axios.get(`/api/stocks/v2`)
    return data.data
}

const StockPrice = async (stock,duration) =>{
    let url = "/api/stocks/" + stock + "/" + duration
    const data = await axios.get(url)
    return data.data
    
}
const StockPerChange = async (stock,duration,rollup,unit) =>{
    let url = "/api/v2/stocks/perchange/" + stock + "/" + duration + "/" + rollup + "/" + unit
    const data = await axios.get(url)
    return data.data
}
const SectorStockPerChange = async (stock,duration,rollup,unit) =>{
    let url = "/api/v2/stocks/secperchange/" + stock + "/" + duration + "/" + rollup + "/" + unit
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
    return data
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



export {ListOfStocks,StockPrice,StockPerChange,StockSector,CreateStockSector,DeleteStockSector,
    SectorStockPerChange,UpdateStockSectors,UpdateStockPrice}