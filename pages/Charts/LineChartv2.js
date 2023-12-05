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
import WaitingForResonse from '../../components/WaitingForResponse'

const LineChartv2 = (props) =>{

    const ref = useRef()
    const tooltipref = useRef()
    const [charData, setcharData] = useState(null)
    const margin = {top: 20, right: 5, bottom: 0, left: 0}
    let width = ref.current?.parentElement.offsetWidth
    let height = ref.current?.parentElement.offsetHeight
    let domainwidth = width - margin.left - margin.right
    let domainheight = height - margin.top - margin.bottom
    const [waiting,setWaiting] = useState(true) 

    useEffect(() => {
        window.addEventListener('resize', updateDimensions);
        return () => {
          window.removeEventListener('resize', updateDimensions);
        }
      }, [])

    const updateDimensions = () => {
        width = window.innerWidth*0.90
        height = window.innerHeight*0.90
        domainwidth = width - 20 
        domainheight = height - 20
    }

    useEffect(() => {
        if (!charData){
            let cacheKey = props.stock + "_" + props.duration + "_PRICE"
            getStockPriceHist(cacheKey,{stock:props.stock,duration:props.duration}).then(res => res?.length ? (setcharData(res),setWaiting(false)) : null)
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
            
            xTicks(g,x,y,width,height,props.allticks,props.noofticks)    
            yTicks(g,x,y,width,height)                

            const swapStk = () => props.swap ? props.swap(props.stock): null
            const classNameAppend = props.main ? "_M" : "_N"
            const {tooltip,onMouseOver,onMouseOut,onMouseMove} = ToolTip(g,tooltipref.current,x,y,charData,swapStk,classNameAppend,props.main)
            Rectangle(g,289,184,tooltip,onMouseOver,onMouseOut,onMouseMove,swapStk,props.background)
            Line(g,charData,x,y,"#1E90FF",true)
            Text(g,x(moment(charData[Math.round(charData.length/2)].date)),0,"")
        }
    },[charData])

    return (
        <>
        <div style={{position:'relative'}}>
            <svg ref={ref} className="SVG_1"/>
            {
                props.main ? <div ref={tooltipref} style={{position:"absolute"}}> </div> : null
            }
        </div>
        </>
    )
}
export default LineChartv2