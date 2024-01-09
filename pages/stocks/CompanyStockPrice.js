import { useEffect, useState,forwardRef } from "react"
import WaitingForResonse from '../../components/WaitingForResponse'
import getStockPriceHist from '../../modules/cache/cacheprice'
import ChartMain from '../PriceCharts/ChartMain'
import {useDispatch} from 'react-redux'
import {getChartDataFromSource} from '../../redux/reducers/chartDataSlice'

const CompanyStockPrice = forwardRef((props,ref) =>{
    const dispatch = useDispatch()
    const [waiting,setWaiting] = useState(true) 
    const [chartFullData,setChartFullData] = useState(null)
    const [chartelements,setChartElements] = useState(["AXIS","LINE","TOOLTIP"])
    
    useEffect(() => {
        if (props.stock && props.duration){
            let cacheKey = props.stock + "_" + props.duration + "_PRICE"
            getStockPriceHist(cacheKey,{stock:props.stock,duration:props.duration}).then(
                res => res?.length ? (setChartFullData(res),setWaiting(false)) : setWaiting(false)
            )
        }
    },[props.stock,props.duration])    

    //below code is causing the full stock detail card to reload on click of the slider within the chart,a Mystery!
    /***
   useEffect(() =>{
    if (props.stock && props.duration){
        let obj = {}
        obj.stock=props.stock
        obj.duration=props.duration
        dispatch(getChartDataFromSource(obj))
        setWaiting(false)
    }
    },[props.stock,props.duration])    
  */

    return (
        <>
            {
                <div style={{paddingLeft:"20px",paddingBottom:"10px"}}>
                    {
                        waiting ? <WaitingForResonse width={50} height={50}/> : 
                            <ChartMain initchartdata={chartFullData} initchartprops={chartelements} ref={ref} stock={props.stock}></ChartMain>
                    }
                </div>
            }
        </>
    )
})

export default CompanyStockPrice