import { useEffect, useState,useRef,forwardRef } from "react"
import ChartAxis from './ChartAxis'
import ChartSize from "./ChartSize"
import ChartLine from "./ChartLine"
import ChartToolTip from './ChartToolTip'
import ChartImage from './ChartImage'
import ChartSingleStraightLine from './ChartSingleStraightLine'
import {useSelector,shallowEqual,useDispatch} from 'react-redux'
import {RESET_REMOVED_ITEMS} from '../../redux/reducers/chartDataSlice'
import * as d3 from "d3";

const ChartContainer = forwardRef((props,inpref) => {
    const dispatch = useDispatch()
    const [chartDims,setChartDims] = useState(null)
    const [chartscales,setChartScales] = useState(null)
    const [inpSizes,setInpSizes] = useState(null)
    const ref = useRef()

    const chartfulldata = useSelector(state => state.chartdata?.initialchartdata?.find(m=> {
        return m.symbol === props.stock
    })?.chartfulldata, shallowEqual)

    const chartComponents = useSelector(state => state.chartdata?.chartelements?.find(m=> {
        return m.symbol === props.stock
    })?.chartelements, shallowEqual)

    const deletedChartComponents = useSelector(state => state.chartdata?.deletedchartelements?.find(m=> {
        return m.symbol === props.stock
    })?.ids)
   
    useEffect(() =>{
        if (inpref){
            let tempsize = {}
            tempsize.w = inpref?.current.offsetWidth 
            tempsize.h = inpref?.current.offsetHeight 
            setInpSizes(tempsize)
        }
    },[inpref])

    useEffect(() =>{
        if(deletedChartComponents && deletedChartComponents.length >0){
            const svgElement = d3.select(ref.current)  
            deletedChartComponents.map(item => svgElement.selectAll("#id_" + item).remove())
            let obj={}
            obj.symbol=props.stock
            obj.ids=[...deletedChartComponents]
            dispatch(RESET_REMOVED_ITEMS(obj))
        }
    },[deletedChartComponents])

    const drawChartComponent = (type, data) => {
        const mapping = [
                            {charttype:"AXIS",chartcomp:<ChartAxis data={data || chartfulldata} ref={ref} wh_props={inpSizes} chartdims={chartDims} setchartscales={setChartScales}></ChartAxis>},
                            {charttype:"LINE",chartcomp:<ChartLine data={data || chartfulldata } ref={ref} propchartscale={chartscales}></ChartLine>},
                            {charttype:"TOOLTIP",chartcomp:<ChartToolTip data={data || chartfulldata } ref={ref} propchartscale={chartscales} chartdims={chartDims}></ChartToolTip>},
                            {charttype:"IMAGE",chartcomp:<ChartImage data={data} ref={ref} propchartscale={chartscales} chartdims={chartDims} ></ChartImage>},
                            {charttype:"STRAIGHTLINE",chartcomp:<ChartSingleStraightLine stock={props.stock} data={data} ref={ref} propchartscale={chartscales} chartdims={chartDims} ></ChartSingleStraightLine>}
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
})

export default ChartContainer