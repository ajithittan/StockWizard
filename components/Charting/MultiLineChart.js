import { useEffect, useRef, useState,useContext } from "react"
import * as d3 from "d3";
import moment from 'moment';
import MultiLineAggregate from './MultiLineAggreate'
import getStockPerChange from '../../modules/cache/cacheperchange'

const MultiLineChart = (props) =>{

    const [width,setWidth] = useState(null)
    const [height,setHeight] = useState(null)
    var margin = {top: 2, right: 2, bottom: 2, left: 2}
    const [stklist,setstklist] = useState(null)
    const [circSize , setcircSize] = useState(1.5)
    const ref = useRef()
    const tooltipref = useRef()
    const [charData, setcharData] = useState(null)
    const [stkPrcData, setstkPrcData] = useState(null)
    const [duration,setDuration] = useState(props.dur)
    const svgElement = d3.select(ref.current)
    const [showAllSector, setshowAllSector] = useState(null)
    const [showspinner,setshowspinner] = useState(true)
    const [inModal,setInModal] = useState(false)

    const keepInList = (stk) => {
        if (showAllSector){
            props.keep(props.labels.filter(item => String(item.id) === stk)[0].desc)
        }else{
            props.keep(stk)
        }
    }

    useEffect(() =>{
        if(props.inModal){
            setInModal(props.inModal)
        }
    },[props.inModal])

    const removeFrmData = (stk) =>{
        if (showAllSector){
            props.remove(props.labels.filter(item => String(item.id) === stk)[0].desc)
        }else{
            props.remove(stk)
        }
    }

    useEffect(() =>{
        if(props.dim){
            setWidth(window.innerWidth*0.75)
            setHeight(window.innerHeight*0.75)
        }else{
            setWidth(ref.current.parentElement.offsetWidth)
            setHeight(ref.current.parentElement.offsetHeight)    
        }
    },[props.dim])

    useEffect(() =>{
        if (!stklist && !showAllSector){
            setstklist(props.stocks)
        }
    },[props.stocks])

    /*
    useEffect(() => {
        window.addEventListener('resize', updateDimensions);
    
        return () => {
          window.removeEventListener('resize', updateDimensions);
        }
      }, [])

    const updateDimensions = () => {
        setWidth(window.innerWidth*0.75)
        setHeight(window.innerHeight*0.75)
    }
    */

    useEffect(() =>{
        if (11 > duration > 48){
            setcircSize(1)
        }else if (duration > 48){
            setcircSize(0.5)
        }
    },[duration])

    const generateRandomHexColor = () => 'hsla(' + Math.floor(Math.random()*360) + ', 100%, 70%, 1)'

    useEffect (async () =>{
        if (!charData && stklist){
           let tempData = []
           //let limit = stklist.length > 10 ? 10 : stklist.length
           let limit = stklist.length
           for (let i=0;i < limit;i++){
            const cacheKey = stklist[i] + "_" + duration + "_" + 1 + "_" + "M"   
               tempData = await getStockPerChange(cacheKey,{'stock':stklist[i],'duration':duration,'rollup':1,'unit':"M",'byType':"C"})
               if (tempData !== undefined && tempData !==[]){
                   let color = generateRandomHexColor()
                   tempData.map(item => {item.color=color; return item})    
                }
                setstkPrcData(tempData)
                setshowspinner(false)    
           } 
        }
    },[stklist])

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

        //svgElement.call(d3.zoom().on("zoom", function () {
          //      console.log("calling zoom...",d3.zoomTransform(this))
            //    svgElement.attr("transform", d3.zoomTransform(this))
             //}))
                    

        if (charData) {

            function initZoom() {
                d3.select('svg')
                    .call(zoom);
            }

            let zoom = d3.zoom()
                .on('zoom', handleZoom);

            function handleZoom(e) {
            d3.select('svg g')
                .attr('transform', e.transform);
            }

            initZoom()    

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
                    .range([0, domainwidth])                  
    
            var y = d3.scaleLinear()
                    .domain(yExtent)
                    .range([domainheight, 0]); 

            let xAxis = (g, x) => g
                .attr("class", "x axis")
                .attr("transform", "translate(0," + y.range()[0] + ")")
                .call(d3.axisBottom(x).ticks(d3.timeMonth.every(2)).tickFormat(d3.timeFormat("%b")))

            const gx = g.append("g")
                .call(xAxis, x);
        
            g.append("g")
                .attr("class", "y axis")
                .attr("transform", "translate(" + x.range()[0] / 2 + ", 0)")
                .call(d3.axisLeft(y).ticks(tickScale(height)).tickFormat(d => d + "%"))

            const area = (data, x) => {
                return d3.area()
                .curve(d3.curveStepAfter)
                .x(d => x(d.date))
                .y0(y(0))
                .y1(d => y(d.value))
              (data)
            }
   
            g.selectAll("rect_up")
                .data(charData)
                .enter()
                .append("rect")
                .attr("x", x(minDt))
                .attr("y", y(maxChng))
                .attr("width", domainwidth)
                .attr("height", y(0) + y(maxChng))
                .attr("fill", "#F5FEF8")
                .on("click",(event,d) => {})
                .on("dblclick", (event,d) => {
                    event.preventDefault();
                    setshowspinner(true)
                    props.openmodal()
                })
                
            g.selectAll("rect_down")
                .data(charData)
                .enter()
                .append("rect")
                .attr("x", x(minDt))
                .attr("y", y(0))
                .attr("width", domainwidth)
                .attr("height", y(minChng) - y(0))
                .attr("fill", "#FFF8F9")
                .on("click",(event,d) => {})
                .on("dblclick", (event,d) => {
                    event.preventDefault();
                    setshowspinner(true)
                    props.openmodal()
                })                
                
            var sumstat = MultiLineAggregate(charData)  
                                
            g.selectAll(".line")
            .append("g")
            .attr("class", "line")
            .data(sumstat)
            .enter()
            .append("path")
            .attr("id", (d,i) => d.values[0].label)
            .attr("d", function (d) {
                return d3.line()
                    .x(d => x(moment(d.date).toDate()))
                    .y(d => y(d.change)).curve(d3.curveCardinal)
                    (d.values)
            })
            .attr("fill", "none")
            .attr("stroke-width", 1)
            .attr("stroke", d => d.values[0].color)
            .on("mouseover", (d,i) => hoveredline(i.values[0].label))
            .on("mouseout", (d,i) => setTimeout(() => hoveredoutline(i.values[0].label),3000))
            .on("click", (event, d) => {
                props.openPrcChart(d.values[0].symbol)
            })
            .style("cursor", "pointer")
             
            const getAllLabels = () => [...new Set(charData.map(item => item.label))]

            const setOpacity = (ignorelabel,opcty) =>{
                let labels = getAllLabels()
                for (let i=0;i < labels.length; i++){
                    if (ignorelabel !== labels[i]){
                        svgElement.selectAll("#" + labels[i])
                        .style('opacity', opcty)
                        .style('transition', "opacity 0.2s")    
                    }
                }    
            }

            const hoveredline = (label) =>{
                svgElement.selectAll("#" + label)
                .style('opacity', 1)
                .attr("stroke-width", 2)
                .style('transition', "opacity 0.1s")
                setOpacity(label,0.05)
            }

            const hoveredoutline = (label) =>{
                svgElement.selectAll("#" + label)
                .style('opacity', 1)
                .attr("stroke-width", 1)
                .style('transition', "opacity 0.1s")
                setOpacity(label,1)
            }
    
            const getRamdomVal = (max) =>{
                return Math.floor(Math.random() * max)
            }
            /*
            g.selectAll("line_label")
                .append("g")
                .data(sumstat)
                .enter()
                .append("text")
                .attr("class", "line_label")
                .attr("id", (d,i) => d.values[0].label)
                .attr("transform", data => {let pos = getRamdomVal(data.values.length-1); return "translate(" + (x(moment(data.values[pos].date).toDate()) + 5) + "," + (y(data.values[pos].change) + 20) + ")" })
                .style("stroke", data => data.values[0].color)
                .text(d => d.key)
                .transition()
                .duration(500)
            */    
            let hoverout = true
            g.selectAll("line_label_x")
                .append("g")
                .data(sumstat)
                .enter()
                .append("text")
                .attr("class", "line_label_x")
                .attr("stroke-width",0.5)
                .attr("transform", data => {let pos = data.values.length-1; return "translate(" + (x(maxDt) + 5) + "," + (y(data.values[pos].change)) + ")" })
                .style("stroke", data => data.values[0].color)
                .text(d => showAllSector ? props.labels.filter(item => String(item.id) === d.key)[0].desc : d.key)
                .style("cursor", "pointer")
                .on("click", (event,i) => {props.hoverOnStk(i.values[0].label,true),hoverout ? hoverout=false : hoverout = true})
                .on("mouseover", (d,i) => {hoveredline(i.values[0].label),props.hoverOnStk(i.values[0].label,true)})
                .on("mouseout", (d,i) => {if (hoverout) {hoveredoutline(i.values[0].label),props.hoverOnStk(i.values[0].label,false)}})
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
                .attr("id", (d,i) => d.label)
                .on("click", (event, d) => {
                    console.log("dddddd",d)
                    //duh!
                    if (sumstat.length > 1) 
                        {
                            props.openPrcChart(d.symbol)
                        }
                        //{svgElement.selectAll("*").remove(),keepInList(d.symbol)}
                    else{
                        //ModalBox(modalref,event,true,props.openPrcChart,d.symbol)
                        props.openPrcChart(d.symbol)
                    }    
                })
                //.style("cursor", "pointer")
                .on('mouseover', (e) => {
                    tooltip.style('display', null)
                })
                .on('mouseout', () => {
                    tooltip
                        .transition()
                        .duration(300)
                        .style('display', 'none')
                })
                .on("mouseover", function(event,d) {
                    let left = (inModal ? event.offsetX + 45 : event.clientX + 10)
                    let top = (inModal ? event.offsetY + 40 : event.clientY + 10) 
                    tooltip.style("left", left +"px")
                    .style("top", top +"px");  
                    tooltip.transition()
                    .duration(200)
                    .style('display', null);
                    tooltip.html( (d.label ? d.label: d.symbol)  + "<br /> " + d.change + "%" + "<br /> " + moment(d.date).format("MMM YYYY"))
                })
                .style("cursor", "pointer")
                .transition()
                .duration(500)
        }
                
    },[charData,width,height])

    return ( 
        <>
            <svg ref={ref}/>
            <div ref={tooltipref} style={{position:"absolute"}}></div>
            {showspinner ? <p>loading......</p> : null}
        </>
    )

}
export default MultiLineChart