import { useEffect, useRef, useState,useContext } from "react"
import * as d3 from "d3";
import {XScale,YScale} from './Components/Scales'
import Rectangle from './Components/Rectangle'
import Line from './Components/Line'
import ToolTip from './Components/ToolTip'

const generateDataset = () =>{
    return ([{symbol:'AAPL',close:121,date:'2021-01-01'},
    {symbol:'AAPL',close:123,date:'2021-02-01'},
    {symbol:'AAPL',close:120,date:'2021-03-01'},
    {symbol:'AAPL',close:119,date:'2021-04-01'},
    {symbol:'AAPL',close:130,date:'2021-05-01'},
    {symbol:'AAPL',close:145,date:'2021-06-01'},
    {symbol:'AAPL',close:150,date:'2021-07-01'},
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

    const [width,setWidth] = useState(props.width)
    const [height,setHeight] = useState(props.height)
    
    var margin = props.margin

    var domainwidth = width - margin.left - margin.right,
        domainheight = height - margin.top - margin.bottom;

    useEffect (() =>{
        const svgElement = d3.select(ref.current)
        svgElement.attr("width",width).attr("height",height)

        var x = XScale(charData,domainwidth,"date")
        var y = YScale(charData,domainheight,"close")  
        
        var g = svgElement.append("g")
            .attr("transform", "translate(" + margin.top + "," + margin.top + ")");    
        
        g.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + y.range()[0] + ")")
        .call(d3.axisBottom(x).ticks(d3.timeMonth.every(3)).tickFormat(d3.timeFormat("%b")))

        g.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + x.range()[0] / 2 + ", 0)")
        .call(d3.axisLeft(y).ticks(5))

        const {tooltip,onMouseOver,onMouseOut,onMouseMove} = ToolTip(tooltipref.current)

        Rectangle(g,charData,x,y,domainwidth,domainheight,tooltip,onMouseOver,onMouseOut,onMouseMove,"date","close")
        Line(g,charData,x,y)


    },[charData])

    return (
        <>
            <svg ref={ref}/>
            <div ref={tooltipref} style={{position:"absolute"}}></div>
            <div ref={modalref} style={{position:"absolute"}}></div>
        </>
    )
}
export default LineChart