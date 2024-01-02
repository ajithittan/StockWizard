import { useEffect, useState,forwardRef } from "react"
import WaitingForResonse from '../../components/WaitingForResponse'
import getStockPriceHist from '../../modules/cache/cacheprice'
import ChartMain from '../PriceCharts/ChartMain'

const CompanyStockPrice = forwardRef((props,ref) =>{
    const [waiting,setWaiting] = useState(true) 
    const [chartelements,setChartElements] = useState(null)

    useEffect(() => {
        if (props.stock && props.duration){
            let cacheKey = props.stock + "_" + props.duration + "_PRICE"
            getStockPriceHist(cacheKey,{stock:props.stock,duration:props.duration}).then(
                res => res?.length ? (setInitialDataForCharts(res),setWaiting(false)) : setWaiting(false)
            )
        }
    },[props.stock,props.duration])    

    const setInitialDataForCharts = (inpData) =>{
        let items = []
        let obj={}
        obj.charttype="AXIS"
        obj.chartdata=inpData
        items.push(obj)
        obj={}
        obj.charttype="LINE"
        obj.chartdata=inpData
        items.push(obj)
        obj={}
        obj.charttype="TOOLTIP"
        obj.chartdata=inpData
        items.push(obj)
        setChartElements([...items])    
    }

    return (
        <>
            {
                <div style={{paddingLeft:"20px",paddingBottom:"10px"}}>
                    {
                        waiting ? <WaitingForResonse width={50} height={50}/> : 
                            <ChartMain initchartprops={chartelements} ref={ref} stock={props.stock}></ChartMain>
                    }
                </div>
            }
        </>
    )
})

export default CompanyStockPrice