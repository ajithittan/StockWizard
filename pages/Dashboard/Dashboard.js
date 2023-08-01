import Stocks from '../stocks' 
import Newsfeeds from '../Newsfeeds'
import ChartsForDashBoard from './ChartsForDashBoard'
import Container from './Container'
import { useState,useEffect } from 'react'
import BottomNav from './BottomNav'
import {PrioritizeStockList} from '../../modules/api/StockMaster'
import {useAppContext} from '../../modules/state/stockstate'
import WaitingForResonse from '../../components/WaitingForResponse'
import {initiateStreaming} from '../../modules/api/StockStream'
import TopMovers from './TopMovers'

const Dashboard = () =>{
    const defaultLayout = [{layoutId:1,compId:[1]},{layoutId:2,compId:[2]},{layoutId:3,compId:[3]}]
    const feedtypes = [3,4,2,6]
    const stklist = useAppContext()
    const [layoutMap, setLayoutMap] = useState(defaultLayout)
    const [stockList,setStockList] = useState(null)
    const [limitStks,setLimitStks] = useState(30)
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
            setStockList([...stkList.slice(0,limitStks)])
        }else{
            setStockList([...stkList])
        }
        setWaiting(false)
    }

    const changesToStkList = (newStk) => setStocksAndStream(newStk)

    const getAllComponents = () =>{
        let componentsToDisplay = []

        for (let i=0;i < layoutMap.length;i++){
            componentsToDisplay.push({layout:i,components:getComponentToDisplay(layoutMap[i].compId)})
        }    
        return componentsToDisplay
    }

    const getComponentToDisplay = (arrLayoutId) =>{
        const mappingOfItems = [{itemId:1,component:<ChartsForDashBoard key={stockList} dur={12} stocks={stockList} actionChangeList={changesToStkList}/>},
                                {itemId:2,component:<Stocks key={stockList} stocks={stockList} actionChangeList={changesToStkList}/>},
                                {itemId:3,component:<Newsfeeds key={stockList} stocks={stockList}/>},
                                {itemId:4,component:<TopMovers />}]

        return mappingOfItems.filter(item => arrLayoutId.includes(item.itemId)).map(item => item.component)                         
    }

    const setStocksAndStream = async (stks) => validateAndSetStks(stks).then(item => initiateStreaming(stks))

    const stockChanges = async (stks) =>{
        setWaiting(true)
        stks ? setStocksAndStream (stks.stocks) : setStocksAndStream (stklist)
    }

    const callBackToAddMovers = (layoutId,addComp) => {
        layoutMap.map(item => {
                    if (item.layoutId === layoutId) {
                        let temparr = item.compId
                        temparr.includes(addComp) ? temparr = temparr.filter(item => item !== addComp) : temparr.push(addComp)
                        item.compId = temparr
                        return item;
                    }
                    return item
                }
            )
        console.log("layoutMap",layoutMap)    
        setLayoutMap([...layoutMap])
    }      

    return (
        <>
            {
                waiting ? 
                <WaitingForResonse /> : 
                <Container key={stockList+layoutMap} components={getAllComponents()}></Container>              
            }
            <BottomNav callBackSectorChange={stockChanges} callBackToAddMovers={callBackToAddMovers}></BottomNav>
        </> 
    )
}

export default Dashboard