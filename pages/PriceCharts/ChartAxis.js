import { useEffect, forwardRef, useState } from 'react'
import {XScale,YScale,XScaleNum} from '../../components/Charting/Components/Scales'
import { xTicks,yTicks,xTicksTime,xTicksNum } from "../../components/Charting/Components/Ticks"
import * as d3 from "d3";
import {useSelector,shallowEqual,useDispatch} from 'react-redux'

const ChartAxis = forwardRef((props,ref) => {

    const chartfulldata = useSelector(state => state.chartdata?.initialchartdata?.find(m=> {
        return m.symbol === props.stock
    })?.chartfulldata, shallowEqual)

    const normalizeData = (inpdata) =>{
        if(chartfulldata){
            return inpdata.splice(0,chartfulldata.length)
        }else{
            return inpdata
        }
    }

    useEffect(() =>{
        if (props.data && props.chartdims && props.wh_props){
            const modifiedData = normalizeData(props.data)
            const svgElement = d3.select(ref.current)
            let g = svgElement.append("g")
            let x = undefined
            let noOfTicks = null
            if (props.chartdims.type === "C"){
                noOfTicks = 4
            }
            let y = YScale(modifiedData,props.chartdims.domainheight,"close")
            if (modifiedData[0].hasOwnProperty('uxtime')){
                x = XScaleNum(modifiedData,props.chartdims.domainwidth,'uxtime')
                xTicksTime(g,x,y,props.chartdims.width,props.chartdims.height,null,10)
            }else{
                x = XScale(modifiedData,props.chartdims.domainwidth,"date")
                xTicks(g,x,y,props.chartdims.width,props.chartdims.height,null,noOfTicks)
            }      
            yTicks(g,x,y,props.chartdims.width,props.chartdims.height)   
            
            props.setchartscales({x:x,y:y})
        }
        
    },[props.data,props.chartdims])

})

export default ChartAxis