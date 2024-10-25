import { useEffect, useState,useRef,forwardRef } from "react"
import * as d3 from "d3";
import {XScaleNum,YScale} from '../../components/Charting/Components/Scales'
import Rectangle from '../../components/Charting/Components/Rectangle'
import {Line} from '../../components/Charting/Components/Line'
import ToolTip from '../../components/Charting/Components/ToolTip'
import Circle from '../../components/Charting/Components/Circlev2'
import { xTicksNum,yTicks } from "../../components/Charting/Components/Ticks"
import Text from '../../components/Charting/Components/Text'

const DrillChartContainer = (props) => {

    const ref = useRef()
    const margin = {top: 20, right: 25, bottom: 20, left: 30}
    const [charData, setcharData] = useState(null)
    let width = ref.current?.parentElement.offsetWidth
    let height = ref.current?.parentElement.offsetHeight
    let domainwidth = width - margin.left - margin.right
    let domainheight = height - margin.top - margin.bottom

    useEffect(() =>{
      if (props.chartstream){
          setcharData(props.chartstream)
      }
    },[props.chartstream])


    useEffect(() => {
        if (charData){
            d3.selectAll("svg > *").remove();
            const svgElement = d3.select(ref.current)
            svgElement.attr("width",width).attr("height",height)

            const x = XScaleNum(charData,domainwidth,"etime")
            const y = YScale(charData,domainheight,"perchange")  

            const g = svgElement.append("g")
                                .attr("transform", "translate(" + 40 + "," + 40 + ")");   

            let clickedSymbols = []
            let symbols = charData.map(item => item.symbol)    
                    
            const callBackFn = (stock) => {
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

            xTicksNum(g,x,y,width,height)    
            yTicks(g,x,y,width,height)     
            Circle(g,charData,x,y,"etime","perchange","symbol",callBackFn)
        }
      }, [charData]);
    
    return(
        <>
            <svg ref={ref}/>
        </>
    )
}

export default forwardRef(DrillChartContainer)