import { useEffect, useRef, useState} from "react"
import * as d3 from "d3";
import {XScale,YScale} from '../../components/Charting/Components/Scales'
import Rectangle from '../../components/Charting/Components/Rectangle'
import ToolTip from '../../components/Charting/Components/ToolTip'
import { xTicks,yTicks } from "../../components/Charting/Components/Ticks"
import MultiLineAggregate from './Components/MultiLineAggreate'
import moment from 'moment';
import useMousePosition from '../../modules/utils/useMousePosition'
import {Line,StraightXLine} from "../../components/Charting/Components/Line";
import ModalBox from '../../components/ModalBox'
import ChartUserInputs from './ChartUserInputs'
import {delStockPositions} from '../../modules/api/UserPreferences'
import WaitingForResonse from '../../components/WaitingForResponse'
//import useArrowKeys from '../../modules/utils/useArrowKeys'

const LineChart = (props) =>{

    const bisectDate = d3.bisector(function(d) { return moment(d.date); }).left;  

    const ref = useRef()
    const tooltipref = useRef()
    const [charData, setcharData] = useState(null)
    const [origCharData,setOrigCharData] = useState(null)
    const [width,setWidth] = useState(props.width)
    const [height,setHeight] = useState(props.height)
    const [domainwidth,setdomainwidth] = useState(null)
    const [domainheight,setdomainheight] = useState(null)
    const mousePos = useMousePosition()
    //const keyPressed = useArrowKeys()
    const[mvOnArrow,setmvOnArrow] = useState(null)
    const [refOnChart, setrefOnChart]  = useState(null)
    const [addLines, setAddLines] = useState(null)
    const [openModal,setOpenModal] = useState(false)
    const [waiting,setWaiting] = useState(true)
    const [paths,setPaths] = useState(null)

    useEffect(() =>{
        if(props.positions && !addLines){
            setAddLines([...props.positions])
        }
        if (props.line){
            setAddLines([...props.line])
        }
    },[props.positions,props.line])

    useEffect(() => {
        d3.select("body")
        .on('keydown', function(e) {
            if (e.keyCode === 39 || e.keyCode === 37){
                if (mvOnArrow){
                    let tempval = refOnChart + (e.keyCode === 39 ? 1 : -1)
                    if (charData.length > tempval && tempval > 0){
                        setrefOnChart (tempval)
                    }
                }else{
                    //console.log("mousePos",mousePos.x)
                    setmvOnArrow(mousePos.x)
                }
            }else if (e.keyCode === 13){
                callBackToCreateLine({"date":charData[refOnChart].date,"close":charData[refOnChart].close})
            }
        })
    },[mousePos,refOnChart])

    const resetOnMouseOver = () => {setmvOnArrow(null),setrefOnChart(null)}

    useEffect(() =>{
        if (props.margin){
            let margin = props.margin
            setdomainwidth(width - margin.left - margin.right)
            setdomainheight(height - margin.top - margin.bottom)
        }
    },[])

    useEffect(() => {
        if (props.addOns){
            setPaths(props.addOns)
        }
    },[props.addOns])
    
    useEffect(() =>{
        if (props.chartData){
            setOrigCharData(props.chartData)
            if (props.displayfrom){
                setcharData(props.chartData.filter(item => moment(item.date) >= moment().subtract(props.displayfrom, 'months')))
            }else{
                setcharData(props.chartData)
            }
        }        
    },[props.chartData,props.displayfrom])

    const callBackToCreateLine = (referenceLine) => {
        if (addLines){
            addLines.push(referenceLine)
            setAddLines([...addLines])
        }else{
            setAddLines([referenceLine])
        }
        setOpenModal(true)
    }

    const callBacktoRemove = (value) =>{
        setAddLines([...addLines.filter(item => item.close !== value.close)])
        delStockPositions(value,props.stock)
    }

    useEffect(() =>{
        if (charData && props.streamdata){
            setcharData([...charData.filter(item => item !== props.streamdata.date),props.streamdata])
        }
    },[props.streamdata])

    const getScaledDataForUniformity = (inpData) =>{
        let startdt = moment(inpData[0].date)
        let enddt = moment(inpData[inpData.length - 1].date)
        let retval = paths.map(eachPath => {return {...eachPath,"data": eachPath.data.filter(item => moment(item.date).isBetween(startdt, enddt, null, '[]'))}})
        return retval
    }

    const getScaledDataDomain = (inpData, dataToCheck) =>{
        let tempval = [...dataToCheck]
        inpData.sort((a,b) => b.close - a.close)
        dataToCheck.sort((a,b) => b.close - a.close)
        if (dataToCheck[0].close < inpData[0].close){
            tempval.push(inpData[0])
        }
        if (dataToCheck[dataToCheck.length - 1].close > inpData[inpData.length - 1].close){
            tempval.push(inpData[inpData.length - 1])
        }
        return tempval 
    }

    useEffect (() =>{

        if (charData) {

            d3.selectAll("svg > *").remove();

            charData.sort(function(a, b) {
                return a.date - b.date;
            });          
            
            const svgElement = d3.select(ref.current)

            let zoom = d3.zoom().on("zoom",handleZoom)

            function handleZoom(e) {
                let zoomedScaleY = e.transform.rescaleY(y);
                let zoomedScaleX = e.transform.rescaleX(x);
                d3.selectAll("#xScale").remove();
                d3.selectAll("#yScale").remove();
                xTicks(g,zoomedScaleX,zoomedScaleY,width,height)    
                yTicks(g,zoomedScaleX,zoomedScaleY,width,height)  
                //g.attr("transform", "translate(" + e.translate + ")scale(" + e.scale + ")");
                //g.translate([((width*e.scale/2)+e.translate[0]),((height*e.scale/2)+e.translate[1])]);  
                var startDate = zoomedScaleX.invert(0);
                var endDate = zoomedScaleX.invert(width); 
                let resetvals = origCharData.filter(item => moment(item.date) >= moment(startDate) && moment(item.date) <= moment(endDate))
                //console.log("post zoom and pan values...",resetvals)
                resetvals.length === charData.length ? null : (d3.selectAll("#multilines").remove(),setcharData([...resetvals]))
              }
            
            const g = svgElement.append("g").call(zoom)
                                .attr("transform", "translate(" + 5 + "," + 5 + ")")                         
            
            svgElement.attr("width",width).attr("height",height)
    
            let x = XScale(charData,domainwidth,"date")
            let y = YScale(charData,domainheight,"close")  
            
            if (paths?.length > 0){
                let scaledval = getScaledDataForUniformity([...charData])
                scaledval.map(item => {
                    let tempval = item.data
                    tempval.sort((a,b) => new Date(a.date) - new Date(b.date))
                    y = YScale(getScaledDataDomain([...tempval],[...charData]),domainheight,"close")
                    Line(g,tempval,x,y,item.color);
                })    
            } 
            
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
                                                swapStk,classNameAppend,props.main,d,callBackToCreateLine)
            Rectangle(g,domainwidth,domainheight,tooltip,onMouseOver,onMouseOut,onMouseMove,swapStk,"white",resetOnMouseOver)
            Line(g,charData,x,y)    
            setWaiting(false)   

            if (addLines){
                addLines.map(val => StraightXLine(g,multiLineData,x,y,val,callBacktoRemove))
            }
            
            if (charData.filter(item => item.symbol === props.stock && item.predictions ===1).length > 0){
                let vertLineXCoord = x(moment(charData.filter(item => item.symbol === props.stock && !item.predictions).pop().date))
                //let vertLineXCoord2 = x(moment(charData.filter(item => item.symbol === props.stock && item.predictions === 1).pop().date))

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
    },[charData,mvOnArrow,refOnChart,addLines,paths])

    const getContentForModal = () => {
        return (<ChartUserInputs referData={addLines[addLines.length - 1]} 
                                 remove={callBacktoRemove} closeModal={setOpenModal} stock={props.stock}></ChartUserInputs>)
    }

    return (
        <div style={{position:'relative'}}>
            {waiting ?  <WaitingForResonse /> : null }
            {openModal ? <ModalBox content={getContentForModal()} onClose={() => setOpenModal(false)}></ModalBox> : null}
            <svg ref={ref} className="SVG_1"/>
            {
                props.main ? <div ref={tooltipref} style={{position:"absolute"}}></div> : null
            }
        </div>
    )
}
export default LineChart