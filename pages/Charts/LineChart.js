import { useEffect, useRef, useState} from "react"
import * as d3 from "d3";
import {XScale,YScale} from '../../components/Charting/Components/Scales'
import Rectangle from '../../components/Charting/Components/Rectangle'
import MultiLine from '../../components/Charting/Components/MultiLine'
import ToolTip from '../../components/Charting/Components/ToolTip'
import { xTicks,yTicks } from "../../components/Charting/Components/Ticks"
import MultiLineAggregate from './Components/MultiLineAggreate'

const LineChart = (props) =>{

    const ref = useRef()
    const tooltipref = useRef()
    const [charData, setcharData] = useState(null)

    const [width,setWidth] = useState(props.width)
    const [height,setHeight] = useState(props.height)
    const [domainwidth,setdomainwidth] = useState(null)
    const [domainheight,setdomainheight] = useState(null)

    
    useEffect(() =>{
        if (props.margin){
            let margin = props.margin
            setdomainwidth(width - margin.left - margin.right)
            setdomainheight(height - margin.top - margin.bottom)
        }
    },[])
    
    useEffect(() =>{
        if (props.chartData){
            setcharData(props.chartData)
        }
    },[props.chartData])


    useEffect (() =>{
        if (charData) {

            d3.selectAll("svg > *").remove();
            
            console.log("charData in LineChart",charData)

            charData.sort(function(a, b) {
                return a.date - b.date;
            });

            const svgElement = d3.select(ref.current)
            svgElement.attr("width",width).attr("height",height)
    
            const x = XScale(charData,domainwidth,"date")
            const y = YScale(charData,domainheight,"close")  
            
            const g = svgElement.append("g")
                .attr("transform", "translate(" + 5 + "," + 5 + ")");   
            
            xTicks(g,x,y,width,height)    
            yTicks(g,x,y,width,height)                

            const swapStk = () => props.swap ? props.swap(props.stock): null
            const classNameAppend = props.main ? "_M" : "_N"
            const multiLineData = MultiLineAggregate(charData)
            const {tooltip,onMouseOver,onMouseOut,onMouseMove} = ToolTip(g,tooltipref.current,x,y,multiLineData,swapStk,classNameAppend,props.main)
            Rectangle(g,domainwidth,domainheight,tooltip,onMouseOver,onMouseOut,onMouseMove,swapStk)
            MultiLine(g,multiLineData,x,y)
        }
    },[charData])

    return (
        <div style={{position:'relative'}}>
            <svg ref={ref} className="SVG_1"/>
            {
                props.main ? <div ref={tooltipref} style={{position:"absolute"}}></div> : null
            }
        </div>
    )
}
export default LineChart