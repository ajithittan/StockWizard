import { useEffect,useRef,forwardRef, useState } from "react"
import Rectangle from '../../components/Charting/Components/Rectangle'
import ToolTipv2 from '../../components/Charting/Components/ToolTipv2'
import * as d3 from "d3";
import {useDispatch} from 'react-redux'
import {addStockPriceAlerts} from '../../redux/reducers/stockAlertsSlice'
import {ADD_ELEMENTS_TO_CHART} from '../../redux/reducers/chartDataSlice'

const ChartToolTip = forwardRef((props,ref) =>{

    const dispatch = useDispatch()
    const tooltipref = useRef()
    
    const callBackFunction = (inpobj) => {
        let uniq = (new Date()).getTime();
        inpobj.symbol = props?.data[0]?.symbol
        inpobj.id = uniq
        let chartElementToAdd = {}
        chartElementToAdd.id = uniq
        chartElementToAdd.symbol = props?.data[0]?.symbol
        chartElementToAdd.type = "ALERT"
        chartElementToAdd.chartdata = inpobj 
        dispatch(ADD_ELEMENTS_TO_CHART([chartElementToAdd]))
        dispatch(addStockPriceAlerts(chartElementToAdd))
    }        
    useEffect(() =>{
        if (props.propchartscale && props.chartdims){
            const svgElement = d3.select(ref.current)    
            let g = svgElement.append("g")
            const resetOnMouseOver = () => {}
            const {tooltip,onMouseOver,onMouseOut,onMouseMove} = ToolTipv2(g,tooltipref.current,props.propchartscale.x,
                props.propchartscale.y,props.data,null,"_M",true,false,callBackFunction,props.chartdims.type)
            Rectangle(g,props.chartdims.domainwidth,props.chartdims.domainheight,tooltip,onMouseOver,onMouseOut,onMouseMove,null,"rgba(0, 0, 0, 0)",resetOnMouseOver)    
        }
    },[props.propchartscale , props.chartdims])

    return(
        <div style={{position:'absolute', width:"100%"}}>
            <div ref={tooltipref} style={{position:"absolute"}}></div>
        </div>
    )
})

export default ChartToolTip