import { useEffect, useRef, useState,useContext } from "react"
import * as d3 from "d3";
import {XScale,YScale} from './Components/Scales'
import Rectangle from './Components/Rectangle'
import Line from './Components/Line'
import ToolTip from './Components/ToolTip'
import getStockPriceHist from '../../modules/cache/cacheprice'
import { xTicks,yTicks } from "./Components/Ticks";

const generateDataset = () =>{
    return ([{symbol:'AAPL',close:121,date:'2021-01-01'},
    {symbol:'AAPL',close:1123,date:'2021-02-01'},
    {symbol:'AAPL',close:120,date:'2021-03-01'},
    {symbol:'AAPL',close:119,date:'2021-04-01'},
    {symbol:'AAPL',close:130,date:'2021-05-01'},
    {symbol:'AAPL',close:145,date:'2021-06-01'},
    {symbol:'AAPL',close:1150,date:'2021-07-01'},
    {symbol:'AAPL',close:120,date:'2021-08-01'},
    {symbol:'AAPL',close:130,date:'2021-09-01'},
    {symbol:'AAPL',close:134,date:'2021-10-01'},
    {symbol:'AAPL',close:145,date:'2021-11-01'},
    {symbol:'AAPL',close:135,date:'2021-12-01'},
    ])
}

const LineChart = (props) =>{

    const ref = useRef()
    const tooltipref = useRef()
    const modalref = useRef()
    const [charData, setcharData] = useState(generateDataset())
    const duration = 12
    const cacheKey = props.stock + "_" + duration + "_PRICE"

    const [width,setWidth] = useState(props.width)
    const [height,setHeight] = useState(props.height)
    
    var margin = props.margin

    var domainwidth = width - margin.left - margin.right,
        domainheight = height - margin.top - margin.bottom;

    useEffect(async () => {
        if (!charData){
            let res = await getStockPriceHist(cacheKey,{stock:props.stock,duration:12})
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
    
            var x = XScale(charData,domainwidth,"date")
            var y = YScale(charData,domainheight,"close")  
            
            var g = svgElement.append("g")
                .attr("transform", "translate(" + margin.top + "," + margin.top + ")");   
            
            xTicks(g,x,y,width,height)    
            yTicks(g,x,y,width,height)    
    
            const {tooltip,onMouseOver,onMouseOut,onMouseMove} = ToolTip(g,tooltipref.current,x,y,charData)            

            const swapStk = () => props.swap ? props.swap(props.stock): null
            
            Rectangle(g,domainwidth,domainheight,tooltip,onMouseOver,onMouseOut,onMouseMove,swapStk)
            Line(g,charData,x,y,tooltip,onMouseOver,onMouseOut,onMouseMove,"date","close")
        }
    },[charData])

    return (
        <>
            <svg ref={ref} className="SVG_1"/>
            <div ref={tooltipref} style={{position:"absolute"}}></div>
            <div ref={modalref} style={{position:"absolute"}}></div>
        </>
    )
}
export default LineChart