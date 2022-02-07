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

    return (
        <>
        {
          props.pos === false ? <div className="sector" onClick={() =>changeSector(0)}>My Positions</div> : null
        }
        {
            sectors ? sectors.map(item => 
                <>
                    <div className="sector" onClick={() =>changeSector(item.sector)}>{item.sector}</div>
                </>
            ) : null
        }
        </>
    )
}

export default SectorStocks