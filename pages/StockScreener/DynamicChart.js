import { useEffect, useState,forwardRef,useRef } from "react"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ChartEntry from '../PriceCharts/ChartEntry'
import {ADD_ELEMENTS_TO_CHART} from '../../redux/reducers/chartDataSlice'
import {useSelector,shallowEqual,useDispatch} from 'react-redux'

const DynamicChart = forwardRef((props,ref) => {
    const dispatch = useDispatch()
    const {dispchartpoints} = useSelector(state => state.stockscreener)

    //console.log("dispchartpoints",dispchartpoints)

    const groupElementsTogether = (inpelements) => Object.groupBy(inpelements, (item) => item.uxtime);

    const dispatchElements = (indx,close,uxtime,label) =>{
      //console.log(indx,close,uxtime,label)
      let chartElementToAdd = {
        "id": indx,
        "symbol": props.symbol,
        "type": "IMAGE",
        "chartdata": {
          "alerttype": "A",
          "symbol": props.symbol,
          "close": close,
          uxtime: uxtime,
          "id": indx,
          label:label
        }
      }
      dispatch(ADD_ELEMENTS_TO_CHART([chartElementToAdd]))
    }

    const cnsolAndDispatch = () =>{

      const uniqueProperties = new Set();

      dispchartpoints.forEach(obj => {
        Object.keys(obj).forEach(key => {
          uniqueProperties.add(key);
        });
      });
  
      const uniquePropertiesArray = [...uniqueProperties].filter(item => item.includes("pattern_int_"));
      const chartelements = []
  
      uniquePropertiesArray.map((eachUnq,index) => {
        const firstIndex = dispchartpoints.findIndex(item => eachUnq in item);
        const lastIndex = dispchartpoints.findLastIndex(item => eachUnq in item);
        const itemstodispatch = {indx:index,x:dispchartpoints[firstIndex].close,y:dispchartpoints[firstIndex].uxtime,label:eachUnq.replace("pattern_int_", "")}
        chartelements.push(itemstodispatch)
        dispatchElements(index,dispchartpoints[firstIndex].close,dispchartpoints[firstIndex].uxtime,eachUnq.replace("pattern_int_", ""))
        dispatchElements(index,dispchartpoints[lastIndex].close,dispchartpoints[lastIndex].uxtime,eachUnq.replace("pattern_int_", ""))
      })

      if (chartelements.length){
        console.log(groupElementsTogether(chartelements))
      }

    }

    useEffect(() =>{
      if(dispchartpoints && dispchartpoints[0].symbol === props.symbol){
        setTimeout(() => cnsolAndDispatch(), 600);
      }
    },[dispchartpoints])

    /***
    useEffect(() =>{    
      if(dispchartpoints && dispchartpoints[0].symbol === props.symbol){
        dispchartpoints.map((item,index) => {
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
          setTimeout(() => dispatch(ADD_ELEMENTS_TO_CHART([chartElementToAdd])), 600);
        })
      }
    },[dispchartpoints])

     */

    /***
     * sample addition that works on the chart.
    let chartElementToAdd = {
        "id": 1750526784272,
        "symbol": "MSFT",
        "type": "IMAGE",
        "chartdata": {
          "alerttype": "A",
          "close": 498.11,
          "threshold": 194.27,
          "date": "2025-04-16T04:00:00.000Z",
          "xPos": 498.4785714285714,
          "yPos": 492.1418361620801,
          "symbol": "MSFT",
          uxtime: 1751878900022,
          "id": 1750526884272,
          label:"GC"
        }
      }
    //console.log("chartElementToAddchartElementToAddchartElementToAdd",props.chartdata)
    //dispatch(ADD_ELEMENTS_TO_CHART([chartElementToAdd]))
    */
     
    return(
        <ChartEntry key={props.chartdata} chartdata={props.chartdata} stock={props.symbol} ref={ref}/>
    )
})

export default DynamicChart