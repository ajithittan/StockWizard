import { useEffect, useRef, useState} from "react"
import * as d3 from "d3";
import {XScale,YScale} from '../../components/Charting/Components/Scales'
import Rectangle from '../../components/Charting/Components/Rectangle'
import MultiLine from '../../components/Charting/Components/MultiLine'
import ToolTip from '../../components/Charting/Components/ToolTip'
import { xTicks,yTicks } from "../../components/Charting/Components/Ticks"
import MultiLineAggregate from './Components/MultiLineAggreate'
import moment from 'moment';
import useMousePosition from '../../modules/utils/useMousePosition'
import {Line,StraightXLine} from "../../components/Charting/Components/Line";
import ModalBox from '../../components/ModalBox'
import ChartUserInputs from './ChartUserInputs'
import {delStockPositions} from '../../modules/api/UserPreferences'
//import useArrowKeys from '../../modules/utils/useArrowKeys'

const LineChart = (props) =>{

    const bisectDate = d3.bisector(function(d) { return moment(d.date); }).left;  

    const ref = useRef()
    const tooltipref = useRef()
    const [charData, setcharData] = useState(null)
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

    useEffect(async () =>{
        console.log("props.line",props.line)
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
                    console.log("mousePos",mousePos.x)
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
    
    useEffect(() =>{
        if (props.chartData){
            setcharData(props.chartData)
        }
    },[props.chartData])

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

    useEffect (() =>{
        if (charData) {

            d3.selectAll("svg > *").remove();
            
            //console.log("charData in LineChart",charData)

            charData.sort(function(a, b) {
                return a.date - b.date;
            });          
            
            const svgElement = d3.select(ref.current)
            
            const g = svgElement.append("g")
                                .attr("transform", "translate(" + 5 + "," + 5 + ")")
            
            svgElement.attr("width",width).attr("height",height)
    
            const x = XScale(charData,domainwidth,"date")
            const y = YScale(charData,domainheight,"close")  
            
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
            MultiLine(g,multiLineData,x,y)
            if (addLines){
                addLines.map(val => StraightXLine(g,multiLineData,x,y,val,callBacktoRemove))
            }
            
            if (charData.filter(item => item.symbol === props.stock && item.predictions ===1).length > 0){
                let vertLineXCoord = x(moment(charData.filter(item => item.symbol === props.stock && !item.predictions).pop().date))
                let vertLineXCoord2 = x(moment(charData.filter(item => item.symbol === props.stock && item.predictions === 1).pop().date))

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
    },[charData,mvOnArrow,refOnChart,addLines])

    const getContentForModal = () => {
        return (<ChartUserInputs referData={addLines[addLines.length - 1]} 
                                 remove={callBacktoRemove} closeModal={setOpenModal} stock={props.stock}></ChartUserInputs>)
    }

    return (
        <div style={{position:'relative'}}>
            {openModal ? <ModalBox content={getContentForModal()} onClose={() => setOpenModal(false)}></ModalBox> : null}
            <svg ref={ref} className="SVG_1"/>
            {
                props.main ? <div ref={tooltipref} style={{position:"absolute"}}></div> : null
            }
        </div>
    )
}
export default LineChart