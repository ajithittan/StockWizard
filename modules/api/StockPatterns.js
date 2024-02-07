import axios from "axios";
import uniq from 'lodash/uniq';

const getPatternsForStock  = async (stock) =>{
    const data = await axios.get(`/realtime/stockpatterns/` + stock)
    return data.data
}

export {getPatternsForStock}