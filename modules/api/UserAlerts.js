import axios from "axios";

const saveStockAlerts  = async (inpvals) =>{
    let url = "/personalize/stockalerts"
    const data = await axios.post(url,inpvals)
    return data.data
}

export {saveStockAlerts}