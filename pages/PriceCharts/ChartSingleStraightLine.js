import { useEffect, forwardRef, useState } from 'react'
import {StraightXLine} from "../../components/Charting/Components/StraightLine";
import * as d3 from "d3";
import {useSelector,shallowEqual} from 'react-redux'

const ChartSingleStraightLine = forwardRef((props,ref) =>{

    const chartfulldata = useSelector(state => state.chartdata?.initialchartdata?.find(m=> {
        return m.symbol === props.stock
    }), shallowEqual)

    useEffect(() =>{
        if (props.data && props.propchartscale && chartfulldata){
            if (props.propchartscale.x && props.propchartscale.y){
                const svgElement = d3.select(ref.current)    
                let g = svgElement.append("g")
                StraightXLine(g,chartfulldata.chartfulldata,props.propchartscale.x,props.propchartscale.y,props.data)
            }        
        }
    },[props.data,props.propchartscale,chartfulldata])
})

export default ChartSingleStraightLine