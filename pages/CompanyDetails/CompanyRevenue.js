import { useEffect, useState } from 'react';
import BarChart from '../../pages/Charts/BarChart'
import myGif from "../../public/loading-loading-forever.gif"
import Image from 'next/image';

const CompanyRevenue = (props) =>{

    let [chartdata,setChartData] = useState(null)
    const margin = {top: 5, right: 5, bottom: 10, left: 15}
    let [wait,setWait] = useState(true)

    useEffect(() =>{
        if (props.inpData){
            formatChartData(props.inpData)
        }
    },[props.inpData])

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
            retval.reverse()
            if (props.period === "A"){
                setChartData(retval.slice(-10))
            }else{
                setChartData(retval.slice(-8))
            }
        }
        setWait(false)
    }

   return(
        <>
            {wait ? <Image src={myGif} alt="wait" height={100} width={100} /> : <BarChart data={chartdata}></BarChart>}
        </>
    )

}

export default CompanyRevenue