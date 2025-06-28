import { useEffect, useState,forwardRef,useRef } from "react"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ChartEntry from '../PriceCharts/ChartEntry'
import {ADD_ELEMENTS_TO_CHART} from '../../redux/reducers/chartDataSlice'
import {useSelector,shallowEqual,useDispatch} from 'react-redux'

const DynamicChart = forwardRef((props,ref) => {

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
    return(
        <ChartEntry key={props.chartdata} chartdata={props.chartdata} stock={props.symbol} ref={ref}/>
    )
})

export default DynamicChart