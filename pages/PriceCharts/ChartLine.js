import { useEffect, forwardRef, useState } from 'react'
import {Line} from "../../components/Charting/Components/Line";
import * as d3 from "d3";

const ChartLine = forwardRef((props,ref) =>{
    useEffect(() =>{
        if (props.data && props.propchartscale?.x && props.propchartscale?.y && props.color && props.id){
                const svgElement = d3.select(ref.current)    
                let g = svgElement.append("g")
                Line(g,props.data,props.propchartscale.x,props.propchartscale.y,props.color,true,props.id)
        }
    },[props.data,props.propchartscale,props.color,props.id])
})

export default ChartLine