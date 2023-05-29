import axios from "axios";

const getBasicStockDetails  = async (stock) =>{
    const data = await axios.get(`/api/v2/companydetails/` + stock)
    return data.data
}

export {getBasicStockDetails}