import { useEffect, useState } from "react"
import getStockSector from '../../../modules/cache/cachesector'

const SectorStocks = (props) =>{
    const [sectors,setSectors] = useState(null)

    useEffect(() => {
        if (!sectors){
            let res = getStockSector()
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
                    <>
                    <div className="sector" style={{width:'45%'}} onClick={() =>changeSector(sector)}>
                        {sector}
                        {
                            stocks.map((item,index) => 
                                <div style={{fontSize:'10px',fontWeight:'normal', textAlign:'left'}}>
                                    {index+1}) {item}
                                </div>
                            )
                        }
                    </div>
                    </>
            )
        }
    }

    return (
        <>
            {
                sectors ? sectors.map(item => Sector(item.sector,item.stocks)) : null
            }
        </>
    )
}

export default SectorStocks