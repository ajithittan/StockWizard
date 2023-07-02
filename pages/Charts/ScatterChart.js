import { useEffect, useRef, useState,useContext } from "react"
import * as d3 from "d3";
import moment from "moment";
import {XScale,YScale} from '../../components/Charting/Components/Scales'
import Rectangle from '../../components/Charting/Components/Rectangle'
import {Line} from '../../components/Charting/Components/Line'
import ToolTip from '../../components/Charting/Components/ToolTip'
import getStockPriceHist from '../../modules/cache/cacheprice'
import { xTicks,yTicks } from "../../components/Charting/Components/Ticks"
import Text from '../../components/Charting/Components/Text'

const LineChart = (props) =>{

    const ref = useRef()
    const tooltipref = useRef()
    const [charData, setcharData] = useState(null)
    const duration = 12
    const cacheKey = props.stock + "_" + duration + "_PRICE"

    const [width,setWidth] = useState(props.width)
    const [height,setHeight] = useState(props.height)
    
    let margin,domainwidth,domainheight = 0
    
    useEffect(() =>{
        if (props.margin){
            margin = props.margin
            domainwidth = width - margin.left - margin.right,
            domainheight = height - margin.top - margin.bottom;        
        }
    },[])

    useEffect(() => {
        if (!charData){
            let res = getStockPriceHist(cacheKey,{stock:props.stock,duration:12})
            console.log(res)
            setcharData(res)
        }
    },[])    

    useEffect (() =>{
        if (charData) {

            charData.sort(function(a, b) {
                return a.date - b.date;
            });

            const svgElement = d3.select(ref.current)
            svgElement.attr("width",width).attr("height",height)
            console.log("in scatter")
            const x = XScale(charData,domainwidth,"symbol")
            const y = YScale(charData,domainheight,"close")  
            
            const g = svgElement.append("g")
                .attr("transform", "translate(" + margin.top + "," + margin.top + ")");   
            
            xTicks(g,x,y,width,height)    
            yTicks(g,x,y,width,height)                

            const swapStk = () => props.swap ? props.swap(props.stock): null
            const classNameAppend = props.main ? "_M" : "_N"
            const {tooltip,onMouseOver,onMouseOut,onMouseMove} = ToolTip(g,tooltipref.current,x,y,charData,swapStk,classNameAppend,props.main)
            Rectangle(g,domainwidth,domainheight,tooltip,onMouseOver,onMouseOut,onMouseMove,swapStk)
            Line(g,charData,x,y)
            Text(g,x(moment(charData[Math.round(charData.length/2)].date)),0,props.stock)
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