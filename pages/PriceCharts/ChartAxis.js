import { useEffect, forwardRef, useState } from 'react'
import {XScale,YScale} from '../../components/Charting/Components/Scales'
import { xTicks,yTicks } from "../../components/Charting/Components/Ticks"
import * as d3 from "d3";

const ChartAxis = (props,ref) => {

    useEffect(() =>{
        if (props.data && props.chartdims && props.wh_props){

            const svgElement = d3.select(ref.current)
            let g = svgElement.append("g")
            let x = XScale(props.data,props.chartdims.domainwidth,"date")
            let y = YScale(props.data,props.chartdims.domainheight,"close")  
            let noOfTicks = null

            if (props.chartdims.type === "C"){
                noOfTicks = 4
            }

            xTicks(g,x,y,props.chartdims.width,props.chartdims.height,null,noOfTicks)    
            yTicks(g,x,y,props.chartdims.width,props.chartdims.height)   
            
            props.setchartscales({x:x,y:y})
        }
        
    },[props.data,props.chartdims])

}

export default forwardRef(ChartAxis)