import { useEffect, useState } from "react"
import {getCompanyQtrPerf} from '../../modules/api/StockMaster'
import Image from 'next/image';
import myGif from '../../public/loading-loading-forever.gif'
import LineChartv2 from '../Charts/LineChartv2'

const CompanyStockPrice = (props) =>{
    const [compDtls,setcompDtls] = useState(null)
    const margin = {top: 20, right: 5, bottom: 0, left: 0}
    const [dur,setDur] = useState(null)

    useEffect(() => {
        setcompDtls(props.stock)
    },[props.stock])

    useEffect(() =>{
        if (props.duration){
            setDur(props.duration)
        }
    },[props.duration])

    return (
        <>
            {
                compDtls && dur? 
                <div style={{paddingLeft:"20px",paddingBottom:"10px"}}><LineChartv2 background={"none"} key={compDtls} 
                        stock={compDtls} margin={margin} swap={false} duration={dur} main={false} allticks={true}/></div>
                :null
            }
        </>
    )
}

export default CompanyStockPrice