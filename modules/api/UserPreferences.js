import axios from "axios";

const saveStockPositions  = async (stkPos,stkSym) =>{
    let url = "/personalize/userPositions/" + stkSym
    const data = await axios.post(url,stkPos)
    return data.data
}

const delStockPositions  = async (stkPos,stkSym) =>{
    let url = "/personalize/deluserPositions/" + stkSym
    const data = await axios.post(url,stkPos)
    return data.data
}

const getStockPortfolioPos = async (stkSym) =>{
    let url = "/personalize/userPositions/" + stkSym
    const data = await axios.get(url,stkSym)
    return data.data
}

const updStockPortfolioPos = async (stkPos) =>{
    let url = "/personalize/userstockportfolio"
    const data = await axios.post(url,stkPos)
    return data.data
}


const getUserNotifications = async (inpType) =>{
    let url = "/personalize/usernotifications/" + inpType
    const data = await axios.get(url)
    return data.data
}

const getUserStocks = async () =>{
    let url = "/api/userstkpositions"
    const data = await axios.get(url)
    return data.data
}

const getUserDashBoardLayout = async () =>{
    let url = "/personalize/dashboard"
    let data = {}
    try{
        await axios.get(url).then(res => data = res.data)
    }catch (err){
    }
    return data
}

const updateUserDashBoardLayout = async (dashopts) =>{
    let url = "/personalize/dashboard"
    let data = []
    try{
        data = await axios.post(url,dashopts)
    }catch (err){
    }
    return data
}

export {saveStockPositions,delStockPositions,getStockPortfolioPos,updStockPortfolioPos,getUserNotifications,
    getUserStocks,getUserDashBoardLayout,updateUserDashBoardLayout}