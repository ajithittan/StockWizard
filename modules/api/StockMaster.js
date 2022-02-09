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
const StockSector = async () =>{
    let url = "http://localhost:5100/api/v2/sectors"
    const data = await axios.get(url)
    return data.data
}

const CreateStockSector = async (sector) =>{
    let url = "http://localhost:5100/api/v2/sectors"
    console.log("left?",sector)
    const data = await axios.post(url,sector)
    return data.data
}

export {ListOfStocks,StockPrice,StockPerChange,StockSector,CreateStockSector}