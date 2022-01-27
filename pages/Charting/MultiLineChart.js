import { useEffect, useRef, useState,useContext } from "react"
import * as d3 from "d3";
import moment from 'moment';
import MultiLineAggregate from './MultiLineAggreate'
import ModalBox from './ModalBox'
import { useRouter } from 'next/router'
import {StockPerChange} from '../../modules/api/StockMaster'
import {useAppContext} from '../../modules/state/stockstate'

const MultiLineChart = () =>{

    const generateDataset = () =>{
        return ([{symbol:'AMD',change:0,date:'2021-01-01'},
        {symbol:'AMD',change:2,date:'2021-02-01'},
        {symbol:'AMD',change:1,date:'2021-03-01'},
        {symbol:'AMD',change:-1,date:'2021-04-01'},
        {symbol:'AMD',change:-1,date:'2021-05-01'},
        {symbol:'AMD',change:-1,date:'2021-06-01'},
        {symbol:'AMD',change:1.5,date:'2021-07-01'},
        {symbol:'AMD',change:1,date:'2021-08-01'},
        {symbol:'AMD',change:1,date:'2021-09-01'},
        {symbol:'AMD',change:0.5,date:'2021-10-01'},
        {symbol:'AMD',change:2.5,date:'2021-11-01'},
        {symbol:'AMD',change:1.5,date:'2021-12-01'},
        ])
    }

    const [width,setWidth] = useState(1400)
    const [height,setHeight] = useState(800)
    var margin = {top: 20, right: 20, bottom: 30, left: 50}

    const stklist = useAppContext()
    const ref = useRef()
    const tooltipref = useRef()
    const modalref = useRef()
    const router = useRouter()
    const [charData, setcharData] = useState(null)
    const [stkPrcData, setstkPrcData] = useState(null)
    const [duration,setDuration] = useState(24)
    const svgElement = d3.select(ref.current)

    const removeFromList = (stk) => {
        setcharData([...charData.filter(item => item.symbol === stk)])
    }

    const action = (stk) =>{
        router.push({pathname: '/Layout',query: {stock:stk}})
    }


    useEffect (async () =>{
        if (!charData && stklist){
           let tempData = []
           for (let i=0;i < stklist.length;i++){
            console.log("stklist[i]",stklist[i])   
            tempData = await StockPerChange(stklist[i],duration,1,"M")
            console.log(tempData)
            setstkPrcData(tempData)
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

        if (charData) {
            let yExtent = d3.extent(charData.map(item => item.change));
            const minDt = moment(charData.reduce((acc,item)=>{return acc&&new Date(acc)<new Date(item.date)?acc:item.date},'')).toDate()
            const maxDt = moment(charData.reduce((acc,item)=>{return acc&&new Date(acc)>new Date(item.date)?acc:item.date},'')).toDate()
    
            const minChng = charData.reduce((acc,item)=>{return acc&& acc < item.change ?acc:item.change},'')
            const maxChng = charData.reduce((acc,item)=>{return acc&& acc > item.change ?acc:item.change},'')
    
            const color = (val) =>{
                if (val === "AAPL") return "steelblue"
                else return "red"
            }
    
            console.log(moment(minDt).toDate(),moment(maxDt).toDate())
    
            var tickScale = d3.scaleQuantize()
                .domain([100, 1600])
                .range([3, 5, 10]); 
    
            var x = d3.scaleTime()
                    .domain([minDt,maxDt])
                    .range([0, domainwidth]);
    
            var y = d3.scaleLinear()
                    .domain(yExtent)
                    .range([domainheight, 0]); 

            g.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + y.range()[0] + ")")
                .call(d3.axisBottom(x).ticks(d3.timeMonth.every(3)).tickFormat(d3.timeFormat("%b")))
        
            g.append("g")
                .attr("class", "y axis")
                .attr("transform", "translate(" + x.range()[0] / 2 + ", 0)")
                .call(d3.axisLeft(y).ticks(tickScale(height)).tickFormat(d => d + "%"))
    
            g.append("g")
                .attr("class", "y axis")
                .attr("transform", "translate(" + x.range()[1] + ", 0)")
                .call(d3.axisRight(y).ticks(tickScale(height)).tickFormat(d => d + "%"))                    
            
                        
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
                    console.log("double clicked....")
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
                    console.log("double clicked....")
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
            .attr("stroke", d => color(d.key))
            .attr("stroke-width", 1)
    
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
                .style("stroke", data => color(data.key))
                .text(d => d.key)
                .transition()
                .duration(2000)
    
            
            const focus = svgElement.append('g')
                            .attr('class', 'focus')
                            .style('display', 'none');
    
            focus.append('circle').attr('r', 5).attr('class', 'circle');
    
            const tooltip = d3
                .select(tooltipref.current)
                .attr('class', 'tooltip')
                .style('display', 'none')
    
            g.selectAll("circle")
            .data(charData)
            .join("circle")
                .attr("cx",d => x(moment(d.date).toDate()))
                .attr("cy",d => y(d.change))
                .attr("r",5)  
                .on("click", (event, d) => {
                    console.log(sumstat.length);
                    if (sumstat.length > 1) 
                        {svgElement.selectAll("*").remove(),removeFromList(d.symbol)}
                    else{
                        ModalBox(modalref,event,true,action,d.symbol)
                    }    
                })
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
                tooltip.html(d.change + "%" + "<br /> " + moment(d.date).format("MMM YYYY"))
                })
                .transition()
                .duration(1000)
        }
                
    },[charData,width,height])

    return ( 
        <div style={{padding:2,paddingLeft:50}} viewBox="0 0 100 100" onScroll={() => console.log("scrolling....")}>
            <svg ref={ref}/>
            <div ref={tooltipref} style={{position:"absolute"}}></div>
            <div ref={modalref} style={{position:"absolute"}}></div>
        </div>
    )

}
export default MultiLineChart