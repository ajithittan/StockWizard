import { useEffect, useState,forwardRef } from "react"
import LineChartv2 from '../Charts/LineChartv2'
import WaitingForResonse from '../../components/WaitingForResponse'
import getStockPriceHist from '../../modules/cache/cacheprice'
import ChartContainer from '../PriceCharts/ChartContainer'

const CompanyStockPrice = (props,ref) =>{

    const [waiting,setWaiting] = useState(true) 
    const [chartelements,setChartElements] = useState(null)

    useEffect(() => {
        if (props.inpvals){
            let cacheKey = props.inpvals.stock + "_" + props.inpvals.duration + "_PRICE"
            getStockPriceHist(cacheKey,{stock:props.inpvals.stock,duration:props.inpvals.duration}).then(
                res => res?.length ? (setDataForCharts(res),setWaiting(false)) : setWaiting(false)
            )
        }
    },[props.inpvals])    

    const setDataForCharts = (inpData) =>{
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
                        <ChartContainer key={chartelements} chartprops={chartelements} ref={ref}></ChartContainer>
                    }
                </div>
            }
        </>
    )
}

export default forwardRef(CompanyStockPrice)