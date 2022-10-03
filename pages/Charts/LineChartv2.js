import { useEffect, useRef, useState,useContext } from "react"
import * as d3 from "d3";
import moment from "moment";
import {XScale,YScale} from '../../components/Charting/Components/Scales'
import Rectangle from '../../components/Charting/Components/Rectangle'
import Line from '../../components/Charting/Components/Line'
import ToolTip from '../../components/Charting/Components/ToolTip'
import getStockPriceHist from '../../modules/cache/cacheprice'
import { xTicks,yTicks } from "../../components/Charting/Components/Ticks"
import Text from '../../components/Charting/Components/Text'

const LineChartv2 = (props) =>{

    const ref = useRef()
    const tooltipref = useRef()
    const [charData, setcharData] = useState(null)
    const duration = 12
    const cacheKey = props.stock + "_" + duration + "_PRICE"

    const [domainwidth,setdomainwidth] = useState(null)
    const [domainheight,setdomainheight] = useState(null)

    const [width,setWidth] = useState(null)
    const [height,setHeight] = useState(null)

    useEffect(() =>{
        setWidth(ref.current.parentElement.offsetWidth)
        setHeight(ref.current.parentElement.offsetHeight)   
    },[])

    useEffect(() => {
        window.addEventListener('resize', updateDimensions);
    
        return () => {
          window.removeEventListener('resize', updateDimensions);
        }
      }, [])

    const updateDimensions = () => {
        setWidth(window.innerWidth*0.90)
        setHeight(window.innerHeight*0.90)
    }

    useEffect(() =>{
        if (props.margin){
            let margin = props.margin
            setdomainwidth(width - margin.left - margin.right)
            setdomainheight(height - margin.top - margin.bottom)
        }
    },[width])

    useEffect(async () => {
        if (!charData){
            let res = await getStockPriceHist(cacheKey,{stock:props.stock,duration:props.duration})
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
    
            const x = XScale(charData,domainwidth,"date")
            const y = YScale(charData,domainheight,"close")  
            
            const g = svgElement.append("g")
                .attr("transform", "translate(" + 5 + "," + 5 + ")");   
            
            xTicks(g,x,y,width,height)    
            yTicks(g,x,y,width,height)                

            const swapStk = () => props.swap ? props.swap(props.stock): null
            const classNameAppend = props.main ? "_M" : "_N"
            const {tooltip,onMouseOver,onMouseOut,onMouseMove} = ToolTip(g,tooltipref.current,x,y,charData,swapStk,classNameAppend,props.main)
            Rectangle(g,domainwidth,domainheight,tooltip,onMouseOver,onMouseOut,onMouseMove,swapStk,true)
            Line(g,charData,x,y)
            Text(g,x(moment(charData[Math.round(charData.length/2)].date)),0,"")
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
export default LineChartv2