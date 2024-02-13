import axios from "axios";

const getPatternsForStock  = async (stock) =>{
    const data = await axios.get(`/realtime/stockpatterns/` + stock)
    return data.data
}

export {getPatternsForStock}