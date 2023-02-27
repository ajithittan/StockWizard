import Stocks from '../stocks' 
import Newsfeeds from '../Newsfeeds'
import ChartsForDashBoard from './ChartsForDashBoard'
import Container from './Container'
import { useState,useEffect } from 'react'
import BottomNav from './BottomNav'
import {useAppContext} from '../../modules/state/stockstate'
import {StockList,PrioritizeStockList} from '../../modules/api/StockMaster'

const Dashboard = () =>{

    const feedtypes = [3,4,2,6]
    const [layoutType, setLayoutType] = useState(3)
    const [stockList,setStockList] = useState(null)
    const [limitStks,setLimitStks] = useState(20)

    useEffect(() =>{
        if (!stockList){
            getPorfolioStks()
        }
    },[])

    const validateAndSetStks = async (stkList) =>{
        if (stkList && stkList.length > limitStks){
            let priorList = await PrioritizeStockList(stkList,limitStks)
            setStockList(priorList)
        }else{
            setStockList(stkList)
        }
    }

    const getPorfolioStks = async () =>{
        let stklist = await StockList()
        let arrStks = Array.from(Object.values(stklist), item => item.symbol)
        validateAndSetStks(arrStks)
    }

    const getAllComponents = () =>{

        let arrComponents = []

        arrComponents.push(<ChartsForDashBoard dur={12} stocks={stockList}/>)
        arrComponents.push(<Stocks stocks={stockList}/>)
        arrComponents.push(<Newsfeeds stocks={stockList}/>)
 
        return arrComponents

    }

    const stockChanges = async (stks) =>{
        if (!stks) {
            await getPorfolioStks()
        }else{
            validateAndSetStks(stks.stocks)
        }
    }

    return (
        <>
            <Container key={stockList} layout={layoutType} components={getAllComponents()}></Container>
            <BottomNav callBackSectorChange={stockChanges}></BottomNav>
        </> 
    )
}

export default Dashboard