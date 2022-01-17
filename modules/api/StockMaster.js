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

export {ListOfStocks,StockPrice}