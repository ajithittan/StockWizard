import { useEffect, forwardRef, useState } from 'react'
import {StraightXLine} from "../../components/Charting/Components/StraightLine";
import * as d3 from "d3";

const ChartSingleStraightLine = forwardRef((props,ref) =>{
    useEffect(() =>{
        if (props.data && props.propchartscale && props.fulldata){
            if (props.propchartscale.x && props.propchartscale.y){
                const svgElement = d3.select(ref.current)    
                let g = svgElement.append("g")
                //(g,chardata,xScale,yScale,inpVals,callback)
                console.log("props.fulldata",props.fulldata)
                StraightXLine(g,props.fulldata,props.propchartscale.x,props.propchartscale.y,props.data)
            }        
        }
    },[props.data,props.propchartscale,props.fulldata])
})

export default ChartSingleStraightLine