import { useEffect, useState,forwardRef,useRef } from "react"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import DynamicChart from './DynamicChart'
import DynamicChartMini from './DynamicChartMini'
import {ADD_ELEMENTS_TO_CHART,INITIAL_CHART_DATA} from '../../redux/reducers/chartDataSlice'
import {useSelector,useDispatch} from 'react-redux'
import {CLICKED_ROW_DATA,REMOVE_ROW_DATA} from '../../redux/reducers/stockScreenerSlice'
import {getTickDataIntraDay} from '../../modules/api/StockMaster'
import StreamScreenerData from './StreamScreenerData'
import DynamicChartNotification from './DynamicChartNotification'

const StockChart = forwardRef((props,ref) => {

    const [inpChartData,setInpChartData] = useState(null)
    const [chartNotify,setChartNotify] = useState(null)

    useEffect(() =>{
        getTickDataIntraDay(props.symbol,1).then(retval => setInpChartData(retval))
    },[props])

    const dispatch = useDispatch()
    let chartElementToAdd = {
        "id": 1750526784272,
        "symbol": "MSFT",
        "type": "ALERT",
        "chartdata": {
          "alerttype": "U",
          "close": 460,
          "threshold": 194.27,
          "date": "2025-04-16T04:00:00.000Z",
          "xPos": 438.4785714285714,
          "yPos": 432.1418361620801,
          "symbol": "MSFT",
          "id": 1750526784272
        }
      }
    //console.log("chartElementToAddchartElementToAddchartElementToAdd",chartElementToAdd)
    //dispatch(ADD_ELEMENTS_TO_CHART([chartElementToAdd]))

    const handleClick = (action) => {
        if (action === "focus"){
            dispatch(CLICKED_ROW_DATA({id:props.id,type:"STOCK_GRAPH",data:props}))    
        }else if (action === "remove"){
            dispatch(REMOVE_ROW_DATA(props.id))
        }
    }

    const callBackFunction = (inpData) =>{
        if(inpData.type === "notify"){
            setChartNotify(inpData.msg)
        }
    }

    return(
        <>
            {
                props.mini ? 
                <DynamicChartMini key={props.symbol} chartdata={inpChartData} symbol={props.symbol} ref={ref} actions={handleClick} callBackFunction={callBackFunction} 
                    notificationcomp={<DynamicChartNotification key={chartNotify} notification={chartNotify} symbol={props.symbol} ref={ref}></DynamicChartNotification>}/>: 
                <>
                    <DynamicChart chartdata={inpChartData} symbol={props.symbol} ref={ref} callBackFunction={callBackFunction}/>
                </>
            }
            <DynamicChartNotification key={chartNotify} notification={chartNotify} symbol={props.symbol} ref={ref}></DynamicChartNotification>
        </>
    )
})

export default StockChart