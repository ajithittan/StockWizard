import { useEffect, useState } from "react"
import {getCompanyQtrPerf} from '../../modules/api/StockMaster'
import Image from 'next/image';
import myGif from '../../public/loading-loading-forever.gif'
import BarChart from '../Charts/BarChart'

const CompanyQtrPerf = (props) =>{
    const [compDtls,setcompDtls] = useState(null)
    const [wait,setWait] = useState(true)
    const margin = {top: 5, right: 5, bottom: 10, left: 15}

    useEffect(async () => {
        if (props.stock){
            let res = await getCompanyQtrPerf(props.stock,1)
            if (res) {
                setcompDtls(res)
                setWait(false)
            }
        }

    },[props.stock])

    return (
        <>
            {wait ? <Image src={myGif} alt="wait" height={30} width={30} /> : 
                compDtls ? 
                    <BarChart data={compDtls} margin={margin}></BarChart>
                :null}
        </>
    )
}

export default CompanyQtrPerf