import { useEffect, useState } from "react"
import getStockSector from '../../../modules/cache/cachesector'

const SectorStocks = (props) =>{
    const [sectors,setSectors] = useState(null)

    useEffect(async () => {
        if (!sectors){
            let res = await getStockSector()
            setSectors(res)
        }
    },[])

    const changeSector = (sector) => {
        if (sector === 0){
            props.onChangeSector(null,sector)
        }else{
            props.onChangeSector(sectors.filter(item => item.sector === sector)[0].stocks,sector)
        }
    }

    const Sector = (sector,stocks) =>{
        if (props.header === sector){
            return null
        }else{
            return (
                <div style={{width:'100%',paddingTop:'5px'}}>
                    <div className="sector listStocks" onClick={() =>changeSector(sector)}>
                        {sector}
                        {
                            stocks.map((item,index) => <div style={{fontSize:'10px',fontWeight:'normal'}}>{index+1}) {item}</div>)
                        }
                    </div>
                </div>
            )
        }
    }

    return (
        <>
        {
          props.pos === false ? <div className="sector listStocks" onClick={() =>changeSector(0)}><p>My Positions</p></div> : null
        }
        {
            sectors ? sectors.map(item => Sector(item.sector,item.stocks)) : null
        }
        </>
    )
}

export default SectorStocks