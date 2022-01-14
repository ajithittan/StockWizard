import axios from "axios";

const ListOfStocks  = async () =>{
    const data = await axios.get(`http://0.0.0.0:5100/api/stocks/v2`)
    return data.data
}

export default ListOfStocks