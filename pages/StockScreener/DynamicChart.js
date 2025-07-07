import { useEffect, useState,forwardRef,useRef } from "react"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ChartEntry from '../PriceCharts/ChartEntry'
import {ADD_ELEMENTS_TO_CHART} from '../../redux/reducers/chartDataSlice'
import {useSelector,shallowEqual,useDispatch} from 'react-redux'

const DynamicChart = forwardRef((props,ref) => {
    const dispatch = useDispatch()
    const {dispchartpoints} = useSelector(state => state.stockscreener)


    useEffect(() =>{
      if(dispchartpoints && dispchartpoints[0].symbol === props.symbol){
        dispchartpoints.map((item,index) => {
          let addelements = {}
          let chartdata = {}
          addelements["id"] = index
          addelements["symbol"] = props.symbol
          addelements["type"] = "IMAGE"
          addelements["type"]
          chartdata["id"] = index
          chartdata["alerttype"] = "A"
          chartdata["uxtime"] = 1751562000000
          chartdata["symbol"] = props.symbol
          chartdata["close"] = 215
          chartdata["label"] = "PP"
          addelements["chartdata"] = chartdata
          console.log(addelements)
          let chartElementToAdd = {
            "id": index,
            "symbol": props.symbol,
            "type": "IMAGE",
            "chartdata": {
              "alerttype": "A",
              "symbol": props.symbol,
              "close": item?.close,
              uxtime: item?.uxtime,
              "id": index,
              label:"PP"
            }
          }
          dispatch(ADD_ELEMENTS_TO_CHART([chartElementToAdd]))
        })
      }
    },[dispchartpoints,props.symbol])

    /***
     * sample addition that works on the chart.
    let chartElementToAdd = {
        "id": 1750526784272,
        "symbol": "MSFT",
        "type": "IMAGE",
        "chartdata": {
          "alerttype": "A",
          "close": 492,
          "threshold": 194.27,
          "date": "2025-04-16T04:00:00.000Z",
          "xPos": 498.4785714285714,
          "yPos": 492.1418361620801,
          "symbol": "MSFT",
          uxtime: 1751533900000,
          "id": 1750526884272,
          label:"GC"
        }
      }
    console.log("chartElementToAddchartElementToAddchartElementToAdd",props.chartdata)
    //dispatch(ADD_ELEMENTS_TO_CHART([chartElementToAdd]))
     */
    return(
        <ChartEntry key={props.chartdata+ref} chartdata={props.chartdata} stock={props.symbol} ref={ref}/>
    )
})

export default DynamicChart