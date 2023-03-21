import axios from "axios";

const saveStockPositions  = async (stkPos,stkSym) =>{
    let url = "/api/userPositions/" + stkSym
    const data = await axios.post(url,stkPos)
    return data.data
}

const delStockPositions  = async (stkPos,stkSym) =>{
    let url = "/api/deluserPositions/" + stkSym
    const data = await axios.post(url,stkPos)
    return data.data
}

const getStockPortfolioPos = async (stkSym) =>{
    let url = "/api/userPositions/" + stkSym
    const data = await axios.get(url,stkSym)
    return data.data
}

const getUserNotifications = async (inpType) =>{
    let url = "/api/usernotifications/" + inpType
    const data = await axios.get(url)
    return data.data
}

export {saveStockPositions,delStockPositions,getStockPortfolioPos,getUserNotifications}