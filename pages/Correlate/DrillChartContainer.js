import { useEffect, useState,useRef,forwardRef } from "react"
import * as d3 from "d3";
import _ from 'lodash';
import {XScaleNum,YScale} from '../../components/Charting/Components/Scalesv2'
import {Linev2} from '../../components/Charting/Components/Line'
import Circle from '../../components/Charting/Components/Circlev2'
import { xTicksNum,yTicks } from "../../components/Charting/Components/Ticksv2"
import { useSelector} from 'react-redux'
import {getRandomColor} from '../../modules/utils/UtilFunctions'

const DrillChartContainer = (props) => {
    const ref = useRef()
    const [count,setCount] = useState(30)
    const [minutes,setMinutes] = useState(500)
    const [ySclRngFctr, setYSclRngFctr] = useState({low:1,high:1})
    const [yScaleData,setYScaleData] = useState([])
    const [xScaleData,setXScaleData] = useState(null)
    const [charData, setcharData] = useState([])
    const [stkColor,setStkColor] = useState(null)
    const margin = {top: 20, right: 25, bottom: 20, left: 30}
    let width = ref.current?.parentElement.offsetWidth
    let height = ref.current?.parentElement.offsetHeight
    let domainwidth = width - margin.left - margin.right
    let domainheight = height - margin.top - margin.bottom
    const svgElement = d3.select(ref.current)
          svgElement.attr("width",width).attr("height",height)
    const g = svgElement.append("g")
          .attr("transform", "translate(" + 40 + "," + 40 + ")")
    let clickedSymbols = []
    const [yScale,setYScale] = useState(null)
    const [xScale,setXScale] = useState(null)

    const {selectedstocks} = useSelector((state) => state.chartdrill)

    useEffect(() => {
        d3.selectAll("svg > *").remove()
        setcharData([])
        return () => d3.selectAll("svg > *").remove()
    }, [])

    useEffect(() =>{
        if(selectedstocks){
            let symbols = charData.map(item => item.symbol)

            if (selectedstocks.length > 0){
                DrawLines(selectedstocks,xScale["action"],yScale["action"])
            }

            symbols.map(item => {
                d3.selectAll("#c_" + item).style("visibility", "hidden")
                d3.selectAll("#ct_" + item).style("visibility", "hidden")
            })
            if(selectedstocks.length === 0){
                RemoveAllLines()
                symbols.map(item => {
                    d3.selectAll("#c_" + item).style("fill", "white").style("stroke", "gray")
                    d3.selectAll("#ct_" + item).style("fill", "#C8C8C8")
                    d3.selectAll("#c_" + item).style("visibility", "visible")
                    d3.selectAll("#ct_" + item).style("visibility", "visible")
                })    
            }
        }
    },[selectedstocks])

    useEffect(() =>{
        if (props.stocks){
            let eventSource = undefined
            eventSource = new EventSource('/stream/analyzecorrelations/' + count + '/' + minutes + '?inpdata=' + JSON.stringify(props.stocks))  
            eventSource.onmessage = e => {
                let stkcorrdata = JSON.parse(e.data)
                if (stkcorrdata && stkcorrdata.length > 0){
                    setcharData(initialdata => [...stkcorrdata,...initialdata])
                }
            }
            eventSource.onerror = (e) => {
                console.log("An error occurred while attempting to connect.",e);
            };   
            return () => eventSource?.close()    
        }
    },[props.stocks])
           
    const callBackFn = (stock) => {
        let symbols = charData.map(item => item.symbol)                    
        if (clickedSymbols.includes(stock)){
            clickedSymbols = clickedSymbols.filter(item => item !== stock)
        }
        else{
            clickedSymbols.push(stock)
        }
        symbols.filter(item => !clickedSymbols.includes(item)).map(item =>{
            d3.selectAll("#c_" + item).style("fill", "white")
              .style("stroke", "gray")
            d3.selectAll("#ct_" + item).style("fill", "#C8C8C8");
        })
        clickedSymbols.map(
            itm => {
                d3.selectAll("#c_" + itm).style("fill", "#DB7093")
                d3.selectAll("#ct_" + itm).style("fill", "#841617")
        })
    }      

    useEffect(() =>{
        if(charData && yScale && xScale){
            if (selectedstocks && selectedstocks.length >0){
                if(xScale && yScale){
                    RemoveAllLines()
                    DrawLines(selectedstocks,xScale["action"],yScale["action"])
                }
                //DrawCircles(charData.filter(item => selectedstocks.includes(item["symbol"])),xScale["action"],yScale["action"],"etime","perchange","symbol")
            }else{
                RemoveAllCircleAndText()
                DrawCircles(charData,xScale["action"],yScale["action"],"etime","perchange","symbol")
            }
        }
    },[charData,xScale,yScale])

    useEffect(() =>{
        if (xScaleData) {
            let xscale = XScaleNum([xScaleData[0],xScaleData[xScaleData.length-1]],domainwidth)
            RemoveXScale()
            TriggerDraw({type:"xscale",action:xscale})    
            setXScale({type:"xscale",action:xscale,data:xScaleData})
        }
    },[xScaleData])

    useEffect(() =>{
        if (yScaleData) {
            let yscale = YScale([yScaleData[0]*ySclRngFctr.low,yScaleData[yScaleData.length - 1]*ySclRngFctr.high],domainheight)
            RemoveYScale()
            TriggerDraw({type:"yscale",action:yscale})  
            setYScale({type:"yscale",action:yscale})  
        }
    },[yScaleData])

    const getStockColor = (stk) =>{
        if(stkColor && stkColor.filter(item => item.stk === stk).length > 0){
            return stkColor.filter(item => item.stk === stk)[0]["clr"]
        }
        let randomColor = getRandomColor()
        if (stkColor){
                setStkColor(initval => [...initval,{stk:stk,clr:randomColor}])
        }else{
            setStkColor([{stk:stk,clr:randomColor}])
        }
        return randomColor
    }

    const RemoveAllLines = () => {
        d3.selectAll("path[id*='ln_']").remove()
        d3.selectAll("text[id*='ln_t_']").remove()
    }

    const RemoveAllCircleAndText = () => {
        d3.selectAll("circle[id*='c_']").remove()
        d3.selectAll("text[id*='ct_']").remove()    
    }

    const RemoveYScale = () => d3.selectAll("#yScaleTicks").remove()

    const RemoveXScale = () => d3.selectAll("#xScaleTicks").remove()

    const DrawLines = (inpData,xScl,yScl) =>{
        inpData.map(stk =>{
            if (charData.filter(item => item["symbol"] === stk).length > 0){
                Linev2(g,charData.filter(item => item["symbol"] === stk),xScl,yScl,getStockColor(stk),200,stk,"etime","perchange")
            }
        })
    }

    const DrawCircles = (inpData,xScl,yScl,xAxis,yAxis,identifier) => Circle(g,inpData,xScl,yScl,xAxis,yAxis,identifier,callBackFn)

    const TriggerDraw = (actionToDraw) => {
        if (actionToDraw.type === "yscale"){
            yTicks(g,actionToDraw.action)                   
        }else if(actionToDraw.type === "xscale"){
            xTicksNum(g,actionToDraw.action,domainheight,actionToDraw.data)                
        }
    }

    const formAndGetYScale = (field) =>{
        if (charData && charData.length >0) {
            let datavals = charData.map(item => item[field]).sort((a,b) => a - b)
            if (yScaleData){
                setYScaleData(initialval => {
                    let newval = [...initialval,datavals[0],datavals[datavals.length -1]].sort((a,b) => a - b)
                    return ([newval[0],newval[newval.length-1]])
                })  
            }  
        }
    }

    const formAndGetXScale = (field) =>{
        if (charData && charData.length >0) {
            let datavals = [...new Set(charData.map(item => item[field]))]
            if (xScaleData){
                let diff = _.difference(datavals,xScaleData)
                if (diff.length > 0){
                    setXScaleData(initialval => [...diff,...initialval].sort((a,b) => a - b))
                }
            }else{
                setXScaleData(datavals.sort((a,b) => a - b))  
            }     
        }
    }


    useEffect(() => {
        if (charData){
            //d3.selectAll("svg > *").remove();
            //symbols = charData.map(item => item.symbol)                    
            formAndGetXScale("etime")
            formAndGetYScale("perchange")
        }
      }, [charData]);
    
    return(
        <>
            <svg ref={ref}/>
        </>
    )
}

export default forwardRef(DrillChartContainer)
