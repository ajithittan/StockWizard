import { useEffect, forwardRef } from 'react'
import Image from "../../components/Charting/Components/Image";
import * as d3 from "d3";

const ChartImage = forwardRef((props,ref) =>{
    const imgurl = "http://localhost:3000/bell.svg"

    useEffect(() =>{
        if (props.data && props.propchartscale){
            if (props.propchartscale.x && props.propchartscale.y){
                console.log(props.data)
                const svgElement = d3.select(ref.current)    
                let g = svgElement.append("g")
                Image(g,props.propchartscale.x,props.propchartscale.y,props.data,imgurl)
            }        
        }
    },[props.data,props.propchartscale])
})

export default ChartImage