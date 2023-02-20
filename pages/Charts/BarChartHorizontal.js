import { useEffect, useRef, useState } from "react"
import * as d3 from "d3";

const BarChartHorizontal = (props) =>{

    const ref = useRef()
    var margin = {top: 2, right: 2, bottom: 2, left: 2}
    //const tooltipref = useRef()
    const [charData, setcharData] = useState(null)
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
        setWidth(ref.current.parentElement.offsetWidth)
        setHeight(ref.current.parentElement.offsetHeight)
    }

    useEffect (() =>{
        if (props.data){
            let tempData = props.data
            tempData.sort((a,b) => {return Math.abs(b.xAxis) - Math.abs(a.xAxis)})
            setcharData(props.data)
        }
    },[props.data])

    const  getRandomColor = () => {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
             color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    const clickBarInChart = (e,val) =>{
        console.log("charvalue clicked",val)
        props.callBackOnClick(val)
    }

    useEffect (() =>{
        if (charData) {

            const svgElement = d3.select(ref.current)
                                svgElement.attr("width",width).attr("height",height)                                
            
            svgElement.selectAll("*").remove()                                     
            
            const getMin = d3.min(charData, function(d) { return d.xAxis}) > 0 ? 0 : d3.min(charData, function(d) { return d.xAxis;})
            const getMax = d3.max(charData, function(d) { return d.xAxis}) < 0 ? 0 : d3.max(charData, function(d) { return d.xAxis;})
    
            const xScale = d3.scaleLinear().range ([getMin, width])
            const yScale = d3.scaleBand().range ([0,height]);
            
            const svg = svgElement.append("g")
                .attr("transform", "translate(" + 5 + "," + 5 + ")");   
            
            xScale.domain([getMin, getMax])
            yScale.domain(charData.map(function(d) { return d.yAxis;})).padding(0.2)
            

            svg.append("g")
                .attr("transform", "translate(0," + 0 + ")")
                .call(
                    d3.axisTop(xScale)
                    .ticks(5)
                    .tickFormat(d => d + "%")
                )

            svg.append("g")
                .attr("transform", `translate(${xScale(0)},0)`)
                .call(d3.axisLeft(yScale))
                .call(g => g.selectAll(".tick text")
                            .filter(y => charData.filter(item => item.yAxis ===y)[0].xAxis < 0)
                            .attr("text-anchor", "start")
                            .attr("x", 6))
                
            svg.selectAll(".bar")
                .data(charData)
                .enter()
                .append("rect")
                .attr("class", "bar")
                .style("fill",function (d) { return getRandomColor()})
                .attr("x", xScale(0))
                .attr("y", function(d) { return yScale(d.yAxis)})
                .attr("width", 0)
                .attr("height", yScale.bandwidth())
                .attr("cursor","pointer")
                .on("click", clickBarInChart)
                .transition()
                    .duration(1000)
                    .attr("x", d => Math.min(xScale(0), xScale(d.xAxis)))
                    .attr("y", function(d) { return yScale(d.yAxis)})
                    .attr("width", d => Math.abs(xScale(d.xAxis) - xScale(0)))
                    .attr("height", yScale.bandwidth())


            svg.append("g")
                .attr("text-anchor", "end")
                .attr("font-family", "sans-serif")
                .attr("font-size", 10)
                .selectAll("text")
                .data(charData)
                  .join("text")
                    .attr("text-anchor", d => d.xAxis < 0 ? "end" : "start")
                    .attr("x", d => xScale(d.xAxis) + Math.sign(d.xAxis - 0) * 4)
                    .attr("y", d => yScale(d.yAxis) + yScale.bandwidth() / 2)
                    .attr("dy", "0.35em")
                    .text(d => d.xAxis + "%");    
  
        }
    },[charData,width,height])

    return (
            <>
            <svg ref={ref}/>            
            </>
    )
}
export default BarChartHorizontal