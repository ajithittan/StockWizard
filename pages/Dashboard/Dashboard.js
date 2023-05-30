import Stocks from '../stocks' 
import Newsfeeds from '../Newsfeeds'
import ChartsForDashBoard from './ChartsForDashBoard'
import Container from './Container'
import { useState,useEffect } from 'react'
import BottomNav from './BottomNav'
import {PrioritizeStockList} from '../../modules/api/StockMaster'
import {useAppContext} from '../../modules/state/stockstate'
import WaitingForResonse from '../../components/WaitingForResponse'

const Dashboard = () =>{

    const feedtypes = [3,4,2,6]
    const stklist = useAppContext()
    const [layoutType, setLayoutType] = useState(3)
    const [stockList,setStockList] = useState(null)
    const [limitStks,setLimitStks] = useState(25)
    const [waiting,setWaiting] = useState(true)

    useEffect(() =>{
        if (stklist){
            validateAndSetStks(stklist)
        }
    },[stklist])

    const validateAndSetStks = async (stkList) =>{
        if (stkList && stkList.length > limitStks){
            //needs optimization.....
            //let priorList = await PrioritizeStockList(stkList,limitStks)
            //setStockList(priorList)
            setStockList([...stkList])
        }else{
            setStockList([...stkList])
        }
        setWaiting(false)
    }

    const changesToStkList = (newStk) => validateAndSetStks(newStk)

    const getAllComponents = () =>{

        let arrComponents = []

        arrComponents.push(<ChartsForDashBoard key={stockList} dur={12} stocks={stockList} actionChangeList={changesToStkList}/>)
        arrComponents.push(<Stocks key={stockList} stocks={stockList} actionChangeList={changesToStkList}/>)
        arrComponents.push(<Newsfeeds key={stockList} stocks={stockList}/>)
 
        return arrComponents

    }

    const stockChanges = async (stks) =>{
        setWaiting(true)
        if (!stks) {
            validateAndSetStks(stklist)
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