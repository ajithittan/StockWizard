import { useEffect, useRef, useState } from "react"
import * as d3 from "d3";
import {getConciseValuesForLargeNums} from '../../modules/utils/UtilFunctions'
import {yTicksRight} from '../../components/Charting/Components/Ticks'
import {XScale,YScale} from '../../components/Charting/Components/Scales'

const BarChart = (props) =>{

    const ref = useRef()
    const tooltipref = useRef()
    const [charData, setcharData] = useState(null)
    const [lineData,setLineData] = useState(null)
    const [width,setWidth] = useState(null)
    const [height,setHeight] = useState(null)
    const [domainwidth,setdomainwidth] = useState(null)
    const [domainheight,setdomainheight] = useState(null)

    useEffect(() =>{
        setWidth(ref.current.parentElement.offsetWidth*0.80)
        setHeight(ref.current.parentElement.offsetHeight)   
    },[])
    /**
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
     */

    useEffect(() =>{
        if (props.margin){
            let margin = props.margin
            setdomainwidth(width - margin.left - margin.right)
            setdomainheight(height - margin.top - margin.bottom)
        }
    },[width,height])

    useEffect (() =>{
        if (props.data){
            setcharData(props.data)
        }
    },[props.data])

    useEffect (() =>{
        if (props.addLineChart && charData){
            let normalizeddata = props.addLineChart.filter(item => charData.filter(innerdata => innerdata.xAxis === item.xAxis).length)
            setLineData(normalizeddata)
        }
    },[props.addLineChart,charData])

    const getTextValue = (yAxis,xAxis) => {
        if (lineData && lineData.filter(item => item.xAxis === xAxis)[0]?.close){
            return getConciseValuesForLargeNums(yAxis) + "(" + lineData.filter(item => item.xAxis === xAxis)[0]?.close + ")"
        }else{
            return   getConciseValuesForLargeNums(yAxis)
        }
    }

    useEffect (() =>{
        if (charData) {

            const svgElement = d3.select(ref.current)
                                svgElement.attr("width",width).attr("height",height)                                
            
            svgElement.selectAll("*").remove()                                
    
            const xScale = d3.scaleBand().range ([0, width]).padding(0.4)
            const yScale = d3.scaleLinear().range ([height, 0]);
            
            const g = svgElement.append("g")
                .attr("transform", "translate(" + 5 + "," + 5 + ")");   
            
            xScale.domain(charData.map(function(d) { return d.xAxis; }),domainwidth);

            if (charData[0]?.yAxis){
                yScale.domain([0, d3.max(charData, function(d) { return d.yAxis;})],domainheight);
            }else if(charData[0]?.yAxis1){
                yScale.domain([0, d3.max(charData, function(d) { return Math.abs(d.yAxis1);})],domainheight);
            }

            let NoOfTicks = charData.length > 5 ? 5 : charData.length

            g.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xScale));
   
           g.append("g")
            .call(d3.axisLeft(yScale).tickFormat(function(d){
                return getConciseValuesForLargeNums(d)
            }).ticks(5))
            .append("text")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")

            if (lineData && lineData.length > 0){
                const yLineScale = d3.scaleLinear().range ([height, 0]);
                yLineScale.domain([0, d3.max(lineData, function(d) { return Math.abs(d.close);})],domainheight);
                
                g.append("g")
                    .call(d3.axisRight(yLineScale).tickFormat(function(d){
                        return getConciseValuesForLargeNums(d)
                    }).ticks(5))
                .attr("transform", "translate(" + width + ",0)")
                .attr("class", "axisOrange")

                let linesOfChart = d3.line().curve(d3.curveCardinal)
                    .x(function(d) { return xScale(d.xAxis)*1.05 })
                    .y(function(d) { return yLineScale(d.close)});

                svgElement.append("path")
                    .datum(lineData)
                    .attr("fill", "none")
                    .attr("stroke", "#FFA500")
                    .attr("stroke-width", 1.5)              
                    .attr("d", linesOfChart)
                
           }
            
            g.selectAll(".bar")
                .data(charData)
                .enter().append("rect")
                .attr("class", "bar")
                .style("fill","blue")
                .attr("x", function(d) { return xScale(d.xAxis); })
                .attr("y", function(d) { return yScale(d.yAxis); })
                .attr("width", xScale.bandwidth())
                .attr("height", function(d) { return height - yScale(d.yAxis); });

                let tooltip = d3.select("body")
                        .append("div")
                        .style("position", "absolute")
                        .style("z-index", "10")
                        .style("visibility", "hidden")
                        .style("background", "white")
                        .text("a simple tooltip");    

            g.selectAll(".bar1")
                .data(charData)
                .enter().append("rect")
                .attr("class", "bar1")
                .style("fill",function(d) { if (d.yAxis1 < 0){return "red"} else{return "green"}})
                .attr("x", function(d) { return xScale(d.xAxis); })
                .attr("y", function(d) { return yScale(d.yAxis1 < 0 ? d.yAxis1*-1 : d.yAxis1); })
                .attr("width", xScale.bandwidth())
                .attr("height", function(d) { return height - yScale(d.yAxis1 < 0 ? d.yAxis1*-1 : d.yAxis1); })
                .on("mouseover", function(event,data){tooltip.text(getTextValue(data.yAxis1,data.xAxis)); return tooltip.style("visibility", "visible");})
                .on("mousemove", function(event,data){return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px")})
                .on("mouseout", function(){return tooltip.style("visibility", "hidden")})
                 
        }
    },[charData,lineData])

    return (
        <>
            <svg ref={ref} className="SVG_1"/>
            {
                props.main ? <div ref={tooltipref} style={{position:"absolute"}}></div> : null
            }
        </>
    )
}
export default BarChart