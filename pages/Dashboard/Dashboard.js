import Stocks from '../stocks' 
import Newsfeeds from '../Newsfeeds'
import ChartsForDashBoard from './ChartsForDashBoard'
import Container from './Container'
import { useState,useEffect } from 'react'
import BottomNav from './BottomNav'
import {StockList,PrioritizeStockList} from '../../modules/api/StockMaster'
import {getUserStocks}  from '../../modules/api/UserPreferences'
import WaitingForResonse from '../../components/WaitingForResponse'

const Dashboard = () =>{

    const feedtypes = [3,4,2,6]
    const [layoutType, setLayoutType] = useState(3)
    const [stockList,setStockList] = useState(null)
    const [limitStks,setLimitStks] = useState(20)
    const [waiting,setWaiting] = useState(true)

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
        setWaiting(false)
    }

    const getPorfolioStks = async () =>{
        let stklist = await getUserStocks()
        console.log("stklist",stklist)
        //let arrStks = Array.from(Object.values(stklist), item => item.symbol)
        //console.log("finally what is in the list",arrStks)
        validateAndSetStks(stklist)
    }

    const getAllComponents = () =>{

        console.log("stockList - getAllComponents",stockList)

        let arrComponents = []

        arrComponents.push(<ChartsForDashBoard dur={12} stocks={stockList}/>)
        arrComponents.push(<Stocks stocks={stockList}/>)
        arrComponents.push(<Newsfeeds stocks={stockList}/>)
 
        return arrComponents

    }

    const stockChanges = async (stks) =>{
        setWaiting(true)
        if (!stks) {
            await getPorfolioStks()
        }else{
            validateAndSetStks(stks.stocks)
        }
    }

    return (
        <>
            {
                waiting ? 
                <WaitingForResonse /> : 
                <Container key={stockList} layout={layoutType} components={getAllComponents()}></Container>              
            }
            <BottomNav callBackSectorChange={stockChanges}></BottomNav>
        </> 
    )
}

export default Dashboard