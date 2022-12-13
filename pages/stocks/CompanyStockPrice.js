import { useEffect, useState } from "react"
import {getCompanyQtrPerf} from '../../modules/api/StockMaster'
import Image from 'next/image';
import myGif from '../../public/loading-loading-forever.gif'
import LineChartv2 from '../Charts/LineChartv2'

const CompanyStockPrice = (props) =>{
    const [compDtls,setcompDtls] = useState(null)
    const [wait,setWait] = useState(false)
    const margin = {top: 20, right: 5, bottom: 0, left: 0}

    useEffect(async () => {
        console.log("CompanyStockPrice",props.stock)
        setcompDtls(props.stock)
    },[props.stock])

    return (
        <>
            {wait ? <Image src={myGif} alt="wait" height={30} width={30} /> : 
                compDtls ? 
                    <LineChartv2 background={"none"} key={props.stock} stock={props.stock} margin={margin} swap={false} duration={24} main={false}/>
                :null}
        </>
    )
}

export default CompanyStockPrice