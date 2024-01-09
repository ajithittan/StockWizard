import { useEffect, forwardRef } from 'react'
import ChartContainer from './ChartContainer'
import {useDispatch} from 'react-redux'
import {INITIAL_CHART_DATA,INITIAL_CHART_ELEMENTS} from '../../redux/reducers/chartDataSlice'

const ChartMain = forwardRef((props,inpref) => {
    const dispatch = useDispatch()

    useEffect(() =>{
        if (props.initchartdata && props.stock){
            let obj = {}
            obj.symbol=props.stock
            obj.chartfulldata = props.initchartdata
            dispatch(INITIAL_CHART_DATA(obj))
        }
    },[props.initchartdata,props.stock])

    useEffect(() =>{
        if (props.initchartprops && props.stock){
            let arr = []
            for (let i=0; i<props.initchartprops.length;i++){
                let obj = {}
                obj.charttype = props.initchartprops[i]
                arr.push(obj)
            }
            if (arr.length > 0){
                let obj = {}
                obj.symbol=props.stock
                obj.chartelements = arr
                dispatch(INITIAL_CHART_ELEMENTS(obj))
            }
        }
    },[props.initchartprops,props.stock])
    
    return (
        <ChartContainer ref={inpref} stock={props.stock}></ChartContainer>
    )
})

export default ChartMain
