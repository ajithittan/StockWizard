import { useEffect, forwardRef, useState } from 'react'
import Image from "../../components/Charting/Components/Image";
import * as d3 from "d3";

const ChartImage = forwardRef((props,ref) =>{
    const imgurl = "http://localhost:3000/bell.svg"
    useEffect(() =>{
        if (props.data){
                const svgElement = d3.select(ref.current)    
                let g = svgElement.append("g")
                Image(g,props.data.xPos,props.data.yPos,props.data.date,props.data.close,imgurl)
            }        
    },[props.data])
})

export default ChartImage