import { useEffect, useState } from 'react'
import {useAppContext} from '../../modules/state/stockstate'
import AddPositions from '../stocks/AddPositions'
import BarChartHorizontal from '../Charts/BarChartHorizontal'
import getStockPerChange from '../../modules/cache/cacheperchange'
import DurationSlider from '../../components/Charting/DurationSlider'
import { useRouter } from 'next/router'

const ChartsForDashBoard = (props) => {
    const [stockList,setstockList] = useState(null)
    const [chartData,setChartData] = useState([])
    const [duration,setDuration] = useState(null)
    const margin = {top: 5, right: 5, bottom: 10, left: 15}
    const router = useRouter()

    useEffect(() =>{
        if(props.dur){
            setDuration(props.dur)
        }
    },[])

    useEffect(() =>{
        console.log("props.newStocks",props.stocks)
        if (props.stocks){
            setstockList(props.stocks)
        }
    },[props.stocks])

    useEffect (() =>{
        if(duration && stockList && stockList.length > 0){
            for(let i=0;i < stockList.length; i++){
                getStkDataFromBackEnd(stockList[i],duration).then(result => {
                    if (chartData){
                        chartData.push(transformData(result))
                        setChartData([...chartData])
                    }})
            }
        }
    },[stockList])

    const transformData = (resultFromDb) =>{
        let retVal = {}
        if(resultFromDb){
            retVal.yAxis = resultFromDb[resultFromDb.length - 1].symbol
            retVal.xAxis = resultFromDb[resultFromDb.length - 1].change
        }
        return retVal
    }

    const getStkDataFromBackEnd = (stkSym,dur) =>{
        const cacheKey = stkSym + "_" + dur + "_" + 1 + "_" + "M"   
        return getStockPerChange(cacheKey,{'stock':stkSym,'duration':dur,'rollup':1,'unit':"M",'byType':"C"})
    }

    const changeDuration = (duration) =>{
        setDuration(parseInt(duration))
        let tempval = []
        if (stockList && stockList.length > 0){
            for(let i=0;i < stockList.length; i++){
                getStkDataFromBackEnd(stockList[i],duration).then(result => {
                    if (tempval){
                        tempval.push(transformData(result))
                        setChartData([...tempval])
                    }})
            }
        }
    }

    const onBarChartClick = (val) =>{
        router.push({pathname: '/PriceCharts',query: {stock:val.yAxis,dur:duration}})
    }

    return(
        <>
            {stockList && stockList.length > 0 ? 
                <>
                    <><BarChartHorizontal data={chartData} margin={margin} callBackOnClick={onBarChartClick}></BarChartHorizontal> </>
                    <><DurationSlider size="small" callBackOnChange={changeDuration} initialval={12} color="gray"></DurationSlider></>
                </>
                : <AddPositions></AddPositions>}
            {/*{stockList && stockList.length > 0 ? <Charting stocks={stockList} duration={duration} name="" callbacks={props.allCallBacks} /> : <AddPositions></AddPositions>}*/}
        </>
    )
   }
  export default ChartsForDashBoard
