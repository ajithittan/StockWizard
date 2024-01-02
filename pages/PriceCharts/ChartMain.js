import { useEffect, useState,forwardRef } from 'react'
import ChartContainer from './ChartContainer'
import {useSelector,useDispatch} from 'react-redux'
import {ADD_ELEMENTS_TO_CHART} from '../../redux/reducers/chartDataSlice'

const ChartMain = forwardRef((props,inpref) =>{
    const dispatch = useDispatch()
    const [chartState,setChartState] = useState(null)
    const {newchartelements} = useSelector((state) => state.chartdata)

    useEffect(() =>{
        if (props.initchartprops){
            const newElements = addNewElementsToCharts()
            if (newElements && newElements.length > 0){
                setChartState([...props.initchartprops,...newElements])
            }else{
                setChartState([...props.initchartprops])
            }
        }
    },[props.initchartprops])

    useEffect(() =>{
        if (newchartelements && chartState){
            const changedData = addNewElementsToCharts()
            if(changedData.length > 0){
                chartState.push(...changedData)
                setChartState([...chartState])  
            }     
        }
    },[newchartelements])

    const addNewElementsToCharts = () => {
        if (newchartelements) {
            return newchartelements.filter(item => item.symbol === props.stock)
        }
    }

    return (
        <ChartContainer chartprops={chartState} ref={inpref} stock={props.stock}></ChartContainer>
    )
})

export default ChartMain