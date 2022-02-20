import { useEffect, useRef, useState,useContext } from "react"
import * as d3 from "d3";
import moment from 'moment';
import MultiLineAggregate from './MultiLineAggreate'
import ModalBox from './ModalBox'
import getStockPerChange from '../../modules/cache/cacheperchange'
import getSectorStockPerChange from '../../modules/cache/cachesectorperchange'

const MultiLineChart = (props) =>{

    const [width,setWidth] = useState(1300)
    const [height,setHeight] = useState(800)
    var margin = {top: 20, right: 20, bottom: 30, left: 50}
    const [stklist,setstklist] = useState(props.stocks)
    const [circSize , setcircSize] = useState(3)
    const ref = useRef()
    const tooltipref = useRef()
    const modalref = useRef()
    const [charData, setcharData] = useState(null)
    const [stkPrcData, setstkPrcData] = useState(null)
    const [duration,setDuration] = useState(props.dur)
    const svgElement = d3.select(ref.current)
    const [showAllSector, setshowAllSector] = useState(null)

    let colors= ['aqua', 'black', 'blue', 'fuchsia', 'gray', 'green', 
                'lime', 'maroon', 'navy', 'olive', 'orange', 'purple', 'red', 
                'silver', 'teal', 'white', 'yellow'];

    const keepInList = (stk) => {
        if (showAllSector){
            props.keep(props.labels.filter(item => String(item.id) === stk)[0].desc)
        }else{
            props.keep(stk)
        }
    }
    const removeFrmData = (stk) =>{
        if (showAllSector){
            props.remove(props.labels.filter(item => String(item.id) === stk)[0].desc)
        }else{
            props.remove(stk)
        }
        
    }

    useEffect(() =>{
        if (36 > duration > 48){
            setcircSize(3)
        }else if (duration > 48){
            setcircSize(2)
        }
    },[duration])

    useEffect(() =>{
        setshowAllSector(props.allSect)
    },[props.allSect])

    useEffect (async () =>{
        if (!charData && stklist){
           let tempData = []
           const generateRandomHexColor = () => `hsla(${Math.random() * 360}, 100%, 50%, 1)`
           for (let i=0;i < stklist.length;i++){
            const cacheKey = stklist[i] + "_" + duration + "_" + 1 + "_" + "M"   
            if (showAllSector !==null){
                if (showAllSector){
                    //console.log("showAllSector - did I make it here?",showAllSector)
                    tempData = await getSectorStockPerChange(cacheKey,{'stock':props.labels.filter(item => item.desc === stklist[i])[0].id,'duration':duration,'rollup':1,'unit':"M"})
                }else{
                    //console.log("did I make it here?",showAllSector)
                    tempData = await getStockPerChange(cacheKey,{'stock':stklist[i],'duration':duration,'rollup':1,'unit':"M"})
                }        
               if (tempData !== undefined && tempData !==[]){
                   let color = generateRandomHexColor()
                   tempData.map(item => {item.color=color; return item})    
                }
                setstkPrcData(tempData)    
            }else{
                break;
            }
           } 
        }
    },[stklist,showAllSector])

    useEffect(() =>{
        charData ? setcharData([...charData,...stkPrcData]) : setcharData(stkPrcData)
    },[stkPrcData])

    useEffect (() => {  
        var domainwidth = width - margin.left - margin.right,
            domainheight = height - margin.top - margin.bottom;

        svgElement.attr("width",width).attr("height",height)
        svgElement.selectAll("*").remove()
        var g = svgElement.append("g")
            .attr("transform", "translate(" + margin.top + "," + margin.top + ")");         

        if (charData) {
            let yExtent = d3.extent(charData.map(item => item.change));
            const minDt = moment(new Date(charData.reduce((acc,item)=>{return acc&&new Date(acc)<new Date(item.date)?acc:item.date},'')).toISOString().slice(0, 10)).toDate()
            const maxDt = moment(new Date(charData.reduce((acc,item)=>{return acc&&new Date(acc)>new Date(item.date)?acc:item.date},'')).toISOString().slice(0, 10)).toDate()
    
            const minChng = charData.reduce((acc,item)=>{return acc&& acc < item.change ?acc:item.change},'')
            const maxChng = charData.reduce((acc,item)=>{return acc&& acc > item.change ?acc:item.change},'')
    
            var tickScale = d3.scaleQuantize()
                .domain([100, 1600])
                .range([3, 5, 10]); 
    
            var x = d3.scaleTime()
                    .domain(d3.extent(charData, d => new Date(d.date)))
                    .range([0, domainwidth]);
    
            var y = d3.scaleLinear()
                    .domain(yExtent)
                    .range([domainheight, 0]); 

            g.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + y.range()[0] + ")")
                .call(d3.axisBottom(x).ticks(d3.timeMonth.every(2)).tickFormat(d3.timeFormat("%b")))
        
            g.append("g")
                .attr("class", "y axis")
                .attr("transform", "translate(" + x.range()[0] / 2 + ", 0)")
                .call(d3.axisLeft(y).ticks(tickScale(height)).tickFormat(d => d + "%"))
            /*
            g.append("g")
                .attr("class", "y axis")
                .attr("transform", "translate(" + x.range()[1] + ", 0)")
                .call(d3.axisRight(y).ticks(tickScale(height)).tickFormat(d => d + "%"))                    
            */        
            g.selectAll("rect_up")
                .data(charData)
                .enter()
                .append("rect")
                .attr("x", x(minDt))
                .attr("y", y(maxChng))
                .attr("width", domainwidth)
                .attr("height", y(0) + y(maxChng))
                .attr("fill", "#EAFFF1")
                .on("click",(event,d) => ModalBox(modalref,event,false))
                .on("dblclick", (event,d) => {
                    //d3.event.preventDefault();
                    // do your thing
                    setWidth(1400)
                    setHeight(800)
                  })
                
            g.selectAll("rect_down")
                .data(charData)
                .enter()
                .append("rect")
                .attr("x", x(minDt))
                .attr("y", y(0))
                .attr("width", domainwidth)
                .attr("height", y(minChng) - y(0))
                .attr("fill", "#FDE7E8")
                .on("click",(event,d) => ModalBox(modalref,event,false))
                .on("dblclick", (event,d) => {
                    //d3.event.preventDefault();
                    //console.log("double clicked....")
                    // do your thing
                    setWidth(1400)
                    setHeight(800)
                  })                
                
            var sumstat = MultiLineAggregate(charData)  
                                
            g.selectAll(".line")
            .append("g")
            .attr("class", "line")
            .data(sumstat)
            .enter()
            .append("path")
            .transition()  
            .duration(1000)
            .attr("d", function (d) {
                return d3.line()
                    .x(d => x(moment(d.date).toDate()))
                    .y(d => y(d.change)).curve(d3.curveCardinal)
                    (d.values)
            })
            .attr("fill", "none")
            .attr("stroke-width", 1)
            .attr("stroke", d => d.values[0].color)
    
            const getRamdomVal = (max) =>{
                return Math.floor(Math.random() * max)
            }
    
            g.selectAll("line_label")
                .append("g")
                .data(sumstat)
                .enter()
                .append("text")
                .attr("class", "line_label")
                .attr("transform", data => {let pos = getRamdomVal(data.values.length-1); return "translate(" + (x(moment(data.values[pos].date).toDate()) + 5) + "," + (y(data.values[pos].change) + 20) + ")" })
                .style("stroke", data => data.values[0].color)
                .text(d => d.key)
                .transition()
                .duration(500)

            g.selectAll("line_label_x")
                .append("g")
                .data(sumstat)
                .enter()
                .append("text")
                .attr("class", "line_label_x")
                .attr("transform", data => {let pos = data.values.length-1; return "translate(" + (x(maxDt) + 5) + "," + (y(data.values[pos].change)) + ")" })
                .style("stroke", data => data.values[0].color)
                .text(d => showAllSector ? props.labels.filter(item => String(item.id) === d.key)[0].desc : d.key)
                .style("cursor", "pointer")
                .on("click", (event,d) => {svgElement.selectAll("*").remove(),removeFrmData(d.key)})
                .transition()
                .duration(500)                
    
            const tooltip = d3
                .select(tooltipref.current)
                .attr('class', 'tooltip')
                .style('display', 'none')

            g.selectAll("circle")
            .data(charData)
            .join("circle")
                .attr("cx",d => x(moment(d.date).toDate()))
                .attr("cy",d => y(d.change))
                .attr("r",circSize)  
                .on("click", (event, d) => {
                    if (sumstat.length > 1) 
                        {svgElement.selectAll("*").remove(),keepInList(d.symbol)}
                    else{
                        ModalBox(modalref,event,true,props.openPrcChart,d.symbol)
                    }    
                })
                .style("cursor", "pointer")
                .on('mouseover', () => {
                    tooltip.style('display', null);
                })
                .on('mouseout', () => {
                    tooltip
                        .transition()
                        .duration(300)
                        .style('display', 'none')
                })
                .on("mouseover", function(event,d) {
                    tooltip.style("left", (event.clientX + 10)+"px")
                    .style("top", (event.clientY +10)+"px");  
                tooltip.transition()
                 .duration(200)
                 .style('display', null);
                tooltip.html( (d.label ? d.label: d.symbol)  + "<br /> " + d.change + "%" + "<br /> " + moment(d.date).format("MMM YYYY"))
                })
                .transition()
                .duration(500)
        }
                
    },[charData,width,height])

    return ( 
        <div style={{padding:2,paddingLeft:40,paddingRight:50}} viewBox="0 0 100 100" onScroll={() => console.log("scrolling....")}>
            <svg ref={ref}/>
            <div ref={tooltipref} style={{position:"absolute"}}></div>
            <div ref={modalref} style={{position:"absolute"}}></div>
        </div>
    )

}
export default MultiLineChart