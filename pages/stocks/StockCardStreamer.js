import { useEffect, useState,forwardRef,useRef } from "react"
import {ADD_ELEMENTS_TO_CHART} from '../../redux/reducers/chartDataSlice'
import {useSelector,useDispatch} from 'react-redux'

const StockCardStreamer = (props) =>{
    const dispatch = useDispatch()
    const {dispchartpoints} = useSelector(state => state.stockscreener)

    const groupElementsTogether = (inpelements) => Object.groupBy(inpelements, (item) => item.uxtime);

    const dispatchElements = (indx,close,uxtime,label) =>{
      //console.log(indx,close,uxtime,label)
      let chartElementToAdd = {
        "id": indx,
        "symbol": props.stock,
        "type": "IMAGE",
        "chartdata": {
          "alerttype": "A",
          "symbol": props.stock,
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
        const moment = require('moment');
        let msgobj = {}
        let notificationobj = {}
        msgobj.symbol = props.stock
        msgobj.message = chartelements.map(({ label, y }) => ({ label, dateime:moment.unix(y/1000).format("hh:mm A") }))
        notificationobj.type="notify"
        notificationobj.msg=msgobj
        props?.callBackFunction(notificationobj)
      }
    }

    useEffect(() =>{
      if(dispchartpoints && dispchartpoints[0].symbol === props.stock){
        setTimeout(() => cnsolAndDispatch(), 600);
      }
    },[dispchartpoints])

    return(
        <></>
    )
}

export default StockCardStreamer