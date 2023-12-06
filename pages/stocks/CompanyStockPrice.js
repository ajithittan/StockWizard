import { useEffect, useState } from "react"
import LineChartv2 from '../Charts/LineChartv2'
import WaitingForResonse from '../../components/WaitingForResponse'
import getStockPriceHist from '../../modules/cache/cacheprice'

const CompanyStockPrice = (props) =>{

    const margin = {top: 20, right: 5, bottom: 0, left: 0}
    const [chartData,setChartData] = useState(null)
    const [waiting,setWaiting] = useState(true) 

    useEffect(() => {
        if (props.inpvals){
            let cacheKey = props.inpvals.stock + "_" + props.inpvals.duration + "_PRICE"
            getStockPriceHist(cacheKey,{stock:props.inpvals.stock,duration:props.inpvals.duration}).then(res => res?.length ? (setChartData(res),setWaiting(false)) : setWaiting(false))
        }
    },[props.inpvals])    

    return (
        <>
            {
                <div style={{paddingLeft:"20px",paddingBottom:"10px"}}>
                    {
                        waiting ? <WaitingForResonse width={50} height={50}/> : 
                                  <LineChartv2 background={"none"} chartdata={chartData} margin={margin} swap={false} 
                                            main={false} allticks={false} noofticks={6}/>

                    }
                </div>
            }
        </>
    )
}

export default CompanyStockPrice