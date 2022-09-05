import axios from "axios";

const StockList = async () =>{
    const data = await axios.get(`/api/stocks/v2`)
    return data.data
}

export default StockList