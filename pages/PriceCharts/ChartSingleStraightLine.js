import { useEffect, forwardRef, useState } from 'react'
import {StraightXLine} from "../../components/Charting/Components/StraightLine";
import * as d3 from "d3";
import {useSelector,shallowEqual,useDispatch} from 'react-redux'
import {HIDE_ADDED_ITEMS_FROM_DB} from '../../redux/reducers/chartDataSlice'
import {deleteStockPriceAlerts} from '../../redux/reducers/stockAlertsSlice'

const ChartSingleStraightLine = forwardRef((props,ref) =>{
    const dispatch = useDispatch()

    const chartfulldata = useSelector(state => state.chartdata?.initialchartdata?.find(m=> {
        return m.symbol === props.stock
    }), shallowEqual)

    const removeItems = (inpData) => {
        dispatch(HIDE_ADDED_ITEMS_FROM_DB([{...inpData,symbol:props.stock}]))
        if (inpData.update){
            dispatch(deleteStockPriceAlerts({...inpData,symbol:props.stock}))
        }
    }

    useEffect(() =>{
        if (props.data && props.propchartscale && chartfulldata){
            if (props.propchartscale.x && props.propchartscale.y){
                const svgElement = d3.select(ref.current)    
                let g = svgElement.append("g")
                StraightXLine(g,chartfulldata.chartfulldata,props.propchartscale.x,props.propchartscale.y,props.data,removeItems)
            }        
        }
    },[props.data,props.propchartscale,chartfulldata])
})

export default ChartSingleStraightLine