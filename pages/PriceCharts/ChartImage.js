import { useEffect, forwardRef } from 'react'
import Image from "../../components/Charting/Components/Image";
import Imagev2 from "../../components/Charting/Components/Imagev2";
import Textv2 from "../../components/Charting/Components/Textv2";
import * as d3 from "d3";

const ChartImage = forwardRef((props,ref) =>{
    const imgurl = "https://sarphira.com/bell.svg"

    useEffect(() =>{
        if (props.data && props.propchartscale){
            console.log("in here?/?",props.data.hasOwnProperty('uxtime'),props.data.label)
            if (props.propchartscale.x && props.propchartscale.y){
                console.log(props.data)
                const svgElement = d3.select(ref.current)    
                let g = svgElement.append("g")
                if (props.data.hasOwnProperty('uxtime')){
                    if (props.data.label){
                        Textv2(g,props.propchartscale.x,props.propchartscale.y,props.data.uxtime,props.data.close,props.data.label)
                    }else{
                        Imagev2(g,props.propchartscale.x,props.propchartscale.y,props.data,imgurl)
                    }
                }
                else{
                        Image(g,props.propchartscale.x,props.propchartscale.y,props.data,imgurl)
                }
            }        
        }
    },[props.data,props.propchartscale])
})

export default ChartImage