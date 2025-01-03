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

const saveStockAlertQuery  = async (inpqry) =>{
    let url = "/personalize/stockalertquery"
    const data = await axios.post(url,inpqry)
    return data.data
}

const getStockAlertQuery  = async (inpqry) =>{
    let url = "/personalize/stockalertquery"
    const data = await axios.get(url)
    return data.data
}

const delStockAlertQuery  = async (inpQryId) =>{
    let url = "/personalize/delstkalertqry/" + inpQryId
    const data = await axios.post(url)
    return data.data
}

export {saveStockAlerts,getStockAlerts,delStockAlerts,saveStockAlertQuery,getStockAlertQuery,delStockAlertQuery}