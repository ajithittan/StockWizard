import axios from "axios";
import uniq from 'lodash/uniq';

const getStocksInSector  = async (sector) =>{
    const data = await axios.get(`/api/externalsectors/` + sector)
    return data.data
}

const getAnalysisForStock = async (stock,indType,duration,profit) =>{
    const data = await axios.get(`/api/stocks/whatif/` + stock + "/" + indType + "/" + duration + "/" + profit)
    console.log("datadatadata",data.data)
    return data.data
}

const getExternalSectorsAndStocks = async () =>{
    const data = await axios.get(`api/extsectorsstocks`)
    return data.data
}

export {getStocksInSector,getAnalysisForStock,getExternalSectorsAndStocks}