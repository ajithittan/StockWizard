import { useEffect, useState } from 'react';
import {getCompanyRevenue} from '../../modules/api/StockDetails'
import BarChart from '../../pages/Charts/BarChart'
import WaitingForResonse from '../../components/WaitingForResponse'

const CompanyRevenue = (props) =>{

    let [chartdata,setChartData] = useState(null)
    const margin = {top: 5, right: 5, bottom: 10, left: 15}

    useEffect(() =>{
        if (props.stock && props.period){
            getCompanyRevenue(props.stock,"ALL",props.period).then(retval => formatChartData(retval))
        }
    },[props.stock, props.period])

    const formatChartData = (inpData) =>{
        let retval = []
        for(let i=0; i < inpData.length ; i++){
            let tempData = {}
            if (props.period === "A"){
                tempData.xAxis = inpData[i].end.slice(0,4)
            }else if (props.period === "Q"){
                tempData.xAxis = inpData[i].fp + "'" + inpData[i].end.slice(2,4)
            }
            tempData.yAxis1 = inpData[i].val
            retval.push(tempData)
        }
        if (retval.length > 0 ){
            console.log("retval",retval)
            setChartData(retval)
        }
    }

   return(
        <>
            {chartdata ? <BarChart data={chartdata} margin={margin}></BarChart> : <WaitingForResonse></WaitingForResonse>}
        </>
    )

}

export default CompanyRevenue