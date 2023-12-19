import { useEffect, useState,useRef,forwardRef } from "react"
import ChartAxis from './ChartAxis'
import ChartSize from "./ChartSize"
import ChartLine from "./ChartLine"
import ChartToolTip from './ChartToolTip'

const ChartContainer = (props,inpref) => {

    const [chartComponents,setChartComponents] = useState(null)
    const [chartDims,setChartDims] = useState(null)
    const [chartscales,setChartScales] = useState(null)
    const [inpSizes,setInpSizes] = useState(null)

    const ref = useRef()

    useEffect(() =>{
        if (inpref){
            let tempsize = {}
            tempsize.w = inpref?.current.offsetWidth 
            tempsize.h = inpref?.current.offsetHeight 
            setInpSizes(tempsize)
        }
    },[inpref])

    useEffect(() =>{
        if (props.chartprops){
            setChartComponents(props.chartprops)
        }
    },[props.chartprops])

    const drawChartComponent = (type, data) => {
        const mapping = [
                            {charttype:"AXIS",chartcomp:<ChartAxis data={data} ref={ref} wh_props={inpSizes} chartdims={chartDims} setchartscales={setChartScales}></ChartAxis>},
                            {charttype:"LINE",chartcomp:<ChartLine data={data} ref={ref} propchartscale={chartscales}></ChartLine>},
                            {charttype:"TOOLTIP",chartcomp:<ChartToolTip data={data} ref={ref} propchartscale={chartscales} chartdims={chartDims}></ChartToolTip>}
                        ]

        return mapping.filter(item => item.charttype === type)[0]?.chartcomp
    }

    return(
        <>
            <ChartSize ref={ref} setchartdims={setChartDims} wh_props={inpSizes}></ChartSize>
            {
                chartComponents?.map(eachComponent => drawChartComponent(eachComponent.charttype,eachComponent.chartdata))
            }
            <svg ref={ref} />
        </>
    )
}

export default forwardRef(ChartContainer)