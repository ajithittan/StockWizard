import axios from "axios";

const saveStockPositions  = async (stkPos) =>{
    let url = "/api/userPositions"
    const data = await axios.post(url,stkPos)
    return data.data
}

export {saveStockPositions}