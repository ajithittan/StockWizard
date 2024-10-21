import { useEffect, useState,useRef,forwardRef } from "react"
import * as d3 from "d3";

const DrillChartContainer = (props) => {

    const ref = useRef()
    const svgElement = d3.select(ref.current)

    useEffect(() =>{
        console.log("chartstream in DrillChartContainer",props.chartstream)
    },[props.chartstream])

    const setDimensions = (width,height) => {
        svgElement.attr("width",width).attr("height",height)
    }

    const addAxis = (width,height) => {
        var x = d3.scaleLinear()
        .domain([0, 100])
        .range([ 0, width ]);

        svgElement.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
    }

    useEffect(() => {
        if (props.size){

          const calcWidth = () =>{
            let width=props.size.w*.95
            let height = 180
            if (props.size.h > 500){
              height = props.size.h*.85
            }
            setDimensions(width,height);
            addAxis(width,height)
          }
          calcWidth();
          const updateDimensions = () => calcWidth()
          window.addEventListener("resize", updateDimensions);
          return () => window.removeEventListener("resize", updateDimensions);
        }
      }, [props.size]);
    

    return(
        <>
            <svg ref={ref}/>
        </>
    )
}

export default forwardRef(DrillChartContainer)