import axios from "axios";

const ListOfStocks  = async () =>{
    const data = await axios.get(`http://0.0.0.0:5100/api/stocks/v2`)
    return data.data
}

const StockPrice = async (stock,duration) =>{
    let url = "http://localhost:5100/api/stocks/" + stock + "/" + duration
    const data = await axios.get(url)
    return data.data
    
}
const StockPerChange = async (stock,duration,rollup,unit) =>{
    let url = "http://localhost:5100/api/v2/stocks/perchange/" + stock + "/" + duration + "/" + rollup + "/" + unit
    const data = await axios.get(url)
    return data.data
}
const SectorStockPerChange = async (stock,duration,rollup,unit) =>{
    let url = "http://localhost:5100/api/v2/stocks/secperchange/" + stock + "/" + duration + "/" + rollup + "/" + unit
    const data = await axios.get(url)
    return data.data
}

const StockSector = async () =>{
    let url = "http://localhost:5100/api/v2/sectors"
    const data = await axios.get(url)
    return data.data
}

const CreateStockSector = async (sector) =>{
    let url = "http://localhost:5100/api/v2/sectors"
    const data = await axios.post(url,sector)
    return data
}

const DeleteStockSector = async (sectorId) =>{
    let url = "http://localhost:5100/api/v2/delsectors/" + sectorId
    const data = await axios.post(url)
    return data
}


export {ListOfStocks,StockPrice,StockPerChange,StockSector,CreateStockSector,DeleteStockSector,SectorStockPerChange}