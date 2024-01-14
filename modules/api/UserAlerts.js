import axios from "axios";

const saveStockAlerts  = async (inpvals) =>{
    let url = "/personalize/stockalerts"
    const data = await axios.post(url,inpvals)
    return data.data
}

const getStockAlerts  = async (stock) =>{
    let url = "/personalize/stockalerts/" + stock
    const data = await axios.get(url)
    return data.data
}

const delStockAlerts  = async (id) =>{
    let url = "/personalize/deletealert/" + id
    const data = await axios.post(url)
    return data.data
}

export {saveStockAlerts,getStockAlerts,delStockAlerts}