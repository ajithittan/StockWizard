import { useEffect, useRef, useState} from "react"
import * as d3 from "d3";
import {XScale,YScale} from '../../components/Charting/Components/Scales'
import Rectangle from '../../components/Charting/Components/Rectangle'
import MultiLine from '../../components/Charting/Components/MultiLine'
import ToolTip from '../../components/Charting/Components/ToolTip'
import { xTicks,yTicks } from "../../components/Charting/Components/Ticks"
import MultiLineAggregate from './Components/MultiLineAggreate'
import moment from 'moment';
import useMousePosition from '../../modules/utils/useMousePosition'

const LineChart = (props) =>{

    const bisectDate = d3.bisector(function(d) { return moment(d.date); }).left;  

    const ref = useRef()
    const tooltipref = useRef()
    const [charData, setcharData] = useState(null)
    const [width,setWidth] = useState(props.width)
    const [height,setHeight] = useState(props.height)
    const [domainwidth,setdomainwidth] = useState(null)
    const [domainheight,setdomainheight] = useState(null)
    const mousePos = useMousePosition()
    const[mvOnArrow,setmvOnArrow] = useState(null)
    const [refOnChart, setrefOnChart]  = useState(null)

    d3.select("body")
        .on('keydown', function(e) {
            if (e.keyCode === 39 || e.keyCode === 37){
                if (mvOnArrow){
                    let tempval = refOnChart + (e.keyCode === 39 ? 1 : -1)
                    if (charData.length > tempval && tempval > 0){
                        setrefOnChart (tempval)
                    }
                }else{
                    setmvOnArrow(mousePos.x)
                }
            }
        })

    const resetOnMouseOver = () => {setmvOnArrow(null),setrefOnChart(null)}

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
            
            //console.log("charData in LineChart",charData)

            charData.sort(function(a, b) {
                return a.date - b.date;
            });

            const svgElement = d3.select(ref.current)            
            
            svgElement.attr("width",width).attr("height",height)
    
            const x = XScale(charData,domainwidth,"date")
            const y = YScale(charData,domainheight,"close")  
            
            const g = svgElement.append("g")
                .attr("transform", "translate(" + 5 + "," + 5 + ")")
            
            xTicks(g,x,y,width,height)    
            yTicks(g,x,y,width,height)    

            const swapStk = () => props.swap ? props.swap(props.stock): null
            const classNameAppend = props.main ? "_M" : "_N"
            const multiLineData = MultiLineAggregate(charData)

            let d = null
            if (refOnChart){
                d = multiLineData[0].values[refOnChart]
            }
            else if (mvOnArrow){
                let xPosition = x.invert(mvOnArrow),
                    closestElement = bisectDate(multiLineData[0].values, moment(xPosition), 1),
                    d0 = multiLineData[0].values[closestElement - 1],
                    d1 = multiLineData[0].values[closestElement]
                d = d1 ? xPosition - d0.date > d1.date - xPosition ? d1 : d0 : d0  
                setrefOnChart(multiLineData[0].values.map(x => x.date).indexOf(d.date))
            }

            const {tooltip,onMouseOver,onMouseOut,onMouseMove} = ToolTip(g,tooltipref.current,x,y,multiLineData,
                                                swapStk,classNameAppend,props.main,d)
            Rectangle(g,domainwidth,domainheight,tooltip,onMouseOver,onMouseOut,onMouseMove,swapStk,"white",resetOnMouseOver)
            MultiLine(g,multiLineData,x,y)

            if (charData.filter(item => item.symbol === props.stock && item.predictions ===1).length > 0){
                let vertLineXCoord = x(moment(charData.filter(item => item.symbol === props.stock && !item.predictions).pop().date))
                let vertLineXCoord2 = x(moment(charData.filter(item => item.symbol === props.stock && item.predictions === 1).pop().date))

                g.append('line')
                    .attr('x1', vertLineXCoord)
                    .attr('y1', domainheight)
                    .attr('x2', vertLineXCoord)
                    .attr('y2', 0)
                    .style("stroke-width", 1)
                    .style("stroke", "red")
                    .style("fill", "none")
    
            }

        }
    },[charData,mvOnArrow,refOnChart])

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