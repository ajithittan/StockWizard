import { useEffect, useState,forwardRef,useRef } from "react"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import DynamicChart from './DynamicChart'
import DynamicChartMini from './DynamicChartMini'
import {ADD_ELEMENTS_TO_CHART} from '../../redux/reducers/chartDataSlice'
import {useSelector,useDispatch} from 'react-redux'
import {CLICKED_ROW_DATA,REMOVE_ROW_DATA} from '../../redux/reducers/stockScreenerSlice'
import {getTickDataIntraDay} from '../../modules/api/StockMaster'

const StockChart = forwardRef((props,ref) => {

    const [inpChartData,setInpChartData] = useState(null)

    useEffect(() =>{
        console.log("in here???")
        getTickDataIntraDay(props.symbol,5).then(retval => setInpChartData(retval))
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

    return(
        <>
            {
                props.mini ? 
                <DynamicChartMini key={props.symbol} actions={handleClick} label={props.symbol} />: 
                <DynamicChart key={props.symbol} chartdata={inpChartData} symbol={props.symbol} ref={ref}/>
            }
        </>
    )
})

export default StockChart