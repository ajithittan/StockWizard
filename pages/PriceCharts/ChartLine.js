import { useEffect, forwardRef, useState } from 'react'
import {Line,StraightXLine} from "../../components/Charting/Components/Line";
import * as d3 from "d3";

const ChartLine = (props,ref) =>{
    useEffect(() =>{
        if (props.data && props.propchartscale){
            if (props.propchartscale.x && props.propchartscale.y){
                const svgElement = d3.select(ref.current)    
                let g = svgElement.append("g")
                Line(g,props.data,props.propchartscale.x,props.propchartscale.y)
            }        
        }
    },[props.data,props.propchartscale])
}

export default forwardRef(ChartLine)