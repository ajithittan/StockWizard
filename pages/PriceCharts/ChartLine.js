import { useEffect, forwardRef, useState } from 'react'
import {Line,Linev2,Linev3,AddToLineChart,AppendToLineChart} from "../../components/Charting/Components/Line";
import * as d3 from "d3";

const ChartLine = forwardRef((props,ref) =>{

    useEffect(() =>{
        if (props.data && props.propchartscale?.x && props.propchartscale?.y && props.color && props.id){
                const svgElement = d3.select(ref.current)    
                let g = svgElement.append("g")
                if (props.data[0].hasOwnProperty('uxtime')){
                    const linegenerator = Linev3(props.propchartscale.x,props.propchartscale.y,'uxtime','close')
                    //the reason thsi remove is here in the future to only get the updates and add em to the chartline...
                    svgElement.select(".line_" + props.id).remove()
                    if (svgElement.select(".line_" + props.id).empty()){
                      AddToLineChart(g,props.data,props.id,props.color,props.strokewid || 0.7,linegenerator)
                    }else{
                        //AddToLineChart(g,props.data,props.id,props.color,props.strokewid || 0.7,linegenerator)
                        AppendToLineChart(g,props.data,props.id,props.color,props.strokewid || 0.7,linegenerator)
                    }
                    //Linev2(g,props.data,props.propchartscale.x,props.propchartscale.y,"blue",true,null,'uxtime','close') 
                }else{
                    Line(g,props.data,props.propchartscale.x,props.propchartscale.y,props.color,true,props.id)
                }
        }
    },[props.data,props.propchartscale,props.color,props.id])
})

export default ChartLine