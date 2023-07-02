import { useEffect, useState } from "react"
import {getCompanyDetails} from '../../modules/api/StockMaster'
import Image from 'next/image';
import myGif from '../../public/loading-loading-forever.gif'

const CompanyDetails = (props) =>{
    const [compDtls,setcompDtls] = useState(null)
    const [wait,setWait] = useState(true)

    useEffect(() => {
        if (props.stock){
            let res = getCompanyDetails(props.stock)
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
                    <>
                        <div className="simpleGrid">
                            <span style={{color:"blue"}}><a href={compDtls.website}>{compDtls.companyName}</a></span>-
                            <span>{compDtls.industry}</span>
                            <span>MCap : {compDtls.marketcap}</span>
                        </div>
                        <div className="simpleGrid">
                            Revenue:<span>{compDtls.revenue}</span>
                            Cash:<span>{compDtls.cash}</span>
                            Debt:<span>{compDtls.debt}</span>
                        </div>
                        <div className="simpleGrid">
                            EBITDA:<span style={{'color': compDtls.ebitdaMargins > 0 ? 'green':'red'}}>{compDtls.ebitdaMargins.toFixed(2)}%</span>
                            Operating M:<span style={{'color': compDtls.operatingMargins > 0 ? 'green':'red'}}>{compDtls.operatingMargins.toFixed(2)}%</span>
                            Profit M : <span style={{'color': compDtls.profitMargins > 0 ? 'green':'red'}}>{compDtls.profitMargins.toFixed(2)}%</span>
                        </div>
                        <div className="simpleGrid">
                            PE:<span>{compDtls.pe > 0 ? compDtls.pe.toFixed(2) : "-NA-" }</span>
                            EPS:<span title="Trailing 12 Months" style={{'color': compDtls.trailingEps > 0 ? 'green':'red'}}>{compDtls.trailingEps.toFixed(2)}</span>
                            Debt-to-Equity:<span title="Trailing 12 Months">{compDtls.deratio.toFixed(2)}</span>
                        </div>
                    </>
                :null}
        </>
    )
}

export default CompanyDetails