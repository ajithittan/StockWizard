import { useEffect, forwardRef } from 'react'
import Image from "../../components/Charting/Components/Image";
import Imagev2 from "../../components/Charting/Components/Imagev2";
import Textv2 from "../../components/Charting/Components/Textv2";
import * as d3 from "d3";

const ChartImage = forwardRef((props,ref) =>{
    const imgurl = "https://sarphira.com/bell.svg"

    useEffect(() =>{
        if (props.data && props.propchartscale){
            if (props.propchartscale.x && props.propchartscale.y){
                const svgElement = d3.select(ref.current)    
                let g = svgElement.append("g")
                if (props.data.hasOwnProperty('uxtime')){
                    if (props.data.label){
                        //console.log("in here before charting the course",g,props.propchartscale.x,props.propchartscale.y,props.data.uxtime,props.data.close,props.data.label)
                        //Textv2(g,props.propchartscale.x,props.propchartscale.y,props.data.uxtime,props.data.close,props.data.label)
                        Imagev2(g,props.propchartscale.x,props.propchartscale.y,props.data.uxtime,props.data.close,imgurl,props.data.label)
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