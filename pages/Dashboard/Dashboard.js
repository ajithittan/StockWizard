import Stocks from '../stocks' 
import ChartsForDashBoard from './ChartsForDashBoard'
import Container from './Container'
import { useEffect, useState } from 'react'
import BottomNav from './BottomNav'
import WaitingForResonse from '../../components/WaitingForResponse'
import {initiateStreaming} from '../../modules/api/StockStream'
import TopMovers from './TopMovers'
import TopNews from './TopNews'
import { useSelector, useDispatch} from 'react-redux'
import {getDashboardLayout,SET_DASH_STOCKS,SET_SECTOR} from '../../redux/reducers/profileDashSlice'

const Dashboard = () =>{
    const dispatch = useDispatch()
    const {dashboardstocks} = useSelector((state) => state.dashboardlayout)
    const {dashboardlayout,loading} = useSelector((state) => state.dashboardlayout)
    const {stockList} = useSelector((state) => state.porfoliostock)
    const {dashboardsector} = useSelector((state) => state.dashboardlayout)
    
    useEffect(() =>{
        if (!dashboardstocks){
            setStocksAndStream(stockList)
        }
    },[dashboardstocks,stockList])

    useEffect(() =>{
        if (!dashboardsector){
            setStocksAndStream(stockList)
        }
    },[stockList])

    useEffect(() =>{
        if(!dashboardlayout){
            dispatch(getDashboardLayout())
        }
    },[dashboardlayout])

    const changesToStkList = (newStk) => setStocksAndStream(newStk)

    const getAllComponents = () =>{
        let componentsToDisplay = []

        for (let i=0;i < dashboardlayout.length;i++){
            componentsToDisplay.push({layout:i,components:getComponentToDisplay(dashboardlayout[i].compId)})
        }    
        return componentsToDisplay
    }

    const getComponentToDisplay = (arrLayoutId) =>{
        const mappingOfItems = [{itemId:1,component:<ChartsForDashBoard key={dashboardstocks} dur={12} stocks={dashboardstocks} actionChangeList={changesToStkList} header="Monthly Performance"/>},
                                {itemId:2,component:<Stocks key={dashboardstocks} stocks={dashboardstocks} actionChangeList={changesToStkList}/>},
                                {itemId:3,component:<></>},
                                {itemId:4,component:<TopMovers header="Movers & Shakers"/>},
                                {itemId:5,component:<TopNews stocks={dashboardstocks} header="Top News"/>}]

        return mappingOfItems.filter(item => arrLayoutId.includes(item.itemId)).map(item => item.component)                         
    }

    const setStocksAndStream = async (stks) => {dispatch(SET_DASH_STOCKS(stks)),initiateStreaming(stks)}

    const stockChanges = async (stks) =>{
        if (stks){
            setStocksAndStream (stks.stocks)
            dispatch(SET_SECTOR(true))
        }else{
            setStocksAndStream (stockList)
        }
    }

    return (
        <>
            {
                dashboardlayout && dashboardstocks ? 
                    <Container key={dashboardstocks+dashboardlayout} components={getAllComponents}></Container> 
                : <WaitingForResonse />              
            }
            <BottomNav callBackSectorChange={stockChanges}></BottomNav>
        </> 
    )
}

export default Dashboard