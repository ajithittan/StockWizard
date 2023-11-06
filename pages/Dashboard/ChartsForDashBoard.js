import { useEffect, useState } from 'react'
import AddPositions from '../stocks/AddPositions'
import BarChartHorizontal from '../Charts/BarChartHorizontal'
import getStockPerChange from '../../modules/cache/cacheperchange'
import DurationSlider from '../../components/Charting/DurationSlider'
import { useRouter } from 'next/router'
import Box from '@mui/material/Box';
import {useSelector,useDispatch} from 'react-redux'
import {updDashboardSlider,SET_DASH_SLIDER_DUR} from '../../redux/reducers/profileDashSlice'

const ChartsForDashBoard = (props) => {
    const dispatch = useDispatch()
    const [stockList,setstockList] = useState(null)
    let [chartData,setChartData] = useState([])
    const margin = {top: 5, right: 5, bottom: 10, left: 15}
    const router = useRouter()
    const {dashboardsliderdur} = useSelector((state) => state.dashboardlayout)
    const {stockquotes} = useSelector((state) => state.porfoliostock)

    useEffect(() =>{
        if (props.stocks){
            setstockList(props.stocks)
        }
    },[props.stocks])

    useEffect (() =>{
        if(stockList && stockList.length > 0){
            retrieveChartData(dashboardsliderdur)
        }
    },[stockList,stockquotes])

    const transformData = (resultFromDb) =>{
        let retVal = {}
        if(resultFromDb?.length > 0){
            retVal.yAxis = resultFromDb[resultFromDb.length - 1].symbol
            retVal.xAxis = resultFromDb[resultFromDb.length - 1].change
        }
        return retVal
    }

    const getStkDataFromBackEnd = (stkSym,dur) =>{
        const cacheKey = stkSym + "_" + dur + "_" + 1 + "_" + "M"   
        return getStockPerChange(cacheKey,{'stock':stkSym,'duration':dur,'rollup':1,'unit':"M",'byType':"C"})
    }

    const retrieveChartData = (duration) =>{
        chartData = []
        //get quotes from cache as it is already available, no need to go to db.
        if (duration === -1){
            setChartData([...stockquotes.map(item => ({"yAxis":item.symbol,"xAxis":+item.perchange}))])
        }else{
            for(let i=0;i < stockList.length; i++){
                getStkDataFromBackEnd(stockList[i],duration).then(result => {
                    if (chartData){
                        let tempval = transformData(result)
                        Object.keys(tempval).length === 0 ? null : chartData.push(tempval)
                        setChartData([...chartData])
                    }})
            }    
        }
    }

    const changeDuration = (duration) =>{
        if (stockList && stockList.length > 0){
            retrieveChartData(duration)
        }
        dispatch(SET_DASH_SLIDER_DUR(duration))
    }

    const onBarChartClick = (val) =>{
        router.push({pathname: '/PriceCharts',query: {stock:val.yAxis,dur:dashboardsliderdur}})
    }

    const addToList = (stks) => props.actionChangeList(stks)

    return(
        <Box sx={{ p: 0.5, minHeight:"50vh", maxHeight:"70vh", borderRadius: 1,margin:"auto", width:"95%"}} >
            {stockList && stockList.length > 0 ? 
                <>
                    <><BarChartHorizontal data={chartData} margin={margin} callBackOnClick={onBarChartClick}></BarChartHorizontal> </>
                    <div style={{marginTop:"30px"}}>
                        <DurationSlider size="small" callBackOnChange={changeDuration} initialval={dashboardsliderdur || 12} color="secondary" />
                    </div>
                </>
                : <AddPositions actionAdd={addToList}></AddPositions>
                }
            {/*{stockList && stockList.length > 0 ? <Charting stocks={stockList} duration={duration} name="" callbacks={props.allCallBacks} /> : <AddPositions></AddPositions>}*/}
        </Box>    
    )
   }
  export default ChartsForDashBoard
