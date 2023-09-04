import { useEffect, useRef, useState } from "react"
import * as d3 from "d3";

const BarChart = (props) =>{

    const ref = useRef()
    const tooltipref = useRef()
    const [charData, setcharData] = useState(null)
    const [width,setWidth] = useState(null)
    const [height,setHeight] = useState(null)
    const [domainwidth,setdomainwidth] = useState(null)
    const [domainheight,setdomainheight] = useState(null)

    useEffect(() =>{
        setWidth(ref.current.parentElement.offsetWidth*0.80)
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

    useEffect (() =>{
        if (props.data){
            setcharData(props.data)
        }
    },[props.data])

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
                if (d < 1000) { return d}
                else if (d/1000000 < 1000)
                    { return d/1000000 + "M"}
                else if (d/1000000 >= 1000){
                    { return d/1000000000 + "B"}
                }    ;
            }).ticks(5))
            .append("text")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")

            g.selectAll(".bar")
                .data(charData)
                .enter().append("rect")
                .attr("class", "bar")
                .style("fill","blue")
                .attr("x", function(d) { return xScale(d.xAxis); })
                .attr("y", function(d) { return yScale(d.yAxis); })
                .attr("width", xScale.bandwidth())
                .attr("height", function(d) { return height - yScale(d.yAxis); });

            g.selectAll(".bar1")
                .data(charData)
                .enter().append("rect")
                .attr("class", "bar1")
                .style("fill",function(d) { if (d.yAxis1 < 0){return "red"} else{return "green"}})
                .attr("x", function(d) { return xScale(d.xAxis); })
                .attr("y", function(d) { return yScale(d.yAxis1 < 0 ? d.yAxis1*-1 : d.yAxis1); })
                .attr("width", xScale.bandwidth())
                .attr("height", function(d) { return height - yScale(d.yAxis1 < 0 ? d.yAxis1*-1 : d.yAxis1); });
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
export default BarChart