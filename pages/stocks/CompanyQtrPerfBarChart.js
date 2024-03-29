import { useEffect, useState } from "react"
import {getCompanyQtrPerf} from '../../modules/api/StockMaster'
import Image from 'next/image';
import myGif from '../../public/loading-loading-forever.gif'
import BarChart from '../Charts/BarChart'

const CompanyQtrPerfBarChart = (props) =>{
    const [compDtls,setcompDtls] = useState(null)
    const [wait,setWait] = useState(true)
    const margin = {top: 5, right: 5, bottom: 10, left: 15}

    useEffect(() => {
        if (props.stock){
            getCompanyQtrPerf(props.stock,1).then (res => {
                if (res) {
                    formatXaxis(res)
                    setcompDtls(res)
                    setWait(false)
                } 
            })
        }

    },[props.stock])

    const formatXaxis = (inpData) => inpData.map(item => {item.xAxis = item.xAxis.slice(0,2)})

    return (
        <>
            {
                wait ? <Image src={myGif} alt="wait" height={30} width={30} /> : 
                    compDtls ? 
                        <div style={{paddingLeft:"20px",paddingBottom:"10px"}}><BarChart data={compDtls} margin={margin}></BarChart></div>
                :null
            }
        </>
    )
}

export default CompanyQtrPerfBarChart