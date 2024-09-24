import Stocks from '../stocks' 
import ChartsForDashBoard from './ChartsForDashBoard'
import Container from './Container'
import { useEffect} from 'react'
import WaitingForResonse from '../../components/WaitingForResponse'
import {initiateStreaming} from '../../modules/api/StockStream'
import TopMovers from './TopMovers'
import TopNews from './TopNews'
import { useSelector, useDispatch} from 'react-redux'
import {getDashboardLayout,SET_DASH_STOCKS} from '../../redux/reducers/profileDashSlice'
import {getMostRecentPatternsFormed} from '../../redux/reducers/stockPatternsSlice'

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
        const mappingOfItems = [{itemId:1,component:<ChartsForDashBoard stocks={dashboardstocks} actionChangeList={changesToStkList} header="Performance"/>},
                                {itemId:2,component:<Stocks/>},
                                {itemId:3,component:<></>},
                                {itemId:4,component:<TopMovers header="Gainers, Losers & Active"/>},
                                {itemId:5,component:<TopNews header="Top News"/>}]

        return mappingOfItems.filter(item => arrLayoutId.includes(item.itemId)).map(item => item.component)                         
    }

    const setStocksAndStream = async (stks) => {dispatch(SET_DASH_STOCKS(stks)),initiateStreaming(stks),dispatch(getMostRecentPatternsFormed())}

    return (
        <>
            {
                dashboardlayout && dashboardstocks ? 
                    <Container components={getAllComponents()}></Container> 
                : <WaitingForResonse />              
            }
        </> 
    )
}

export default Dashboard