import { useEffect, useState } from "react"
import getStockSector from '../../../modules/cache/cachesector'

const SectorStocks = () =>{
    const [sectors,setSectors] = useState(null)

    useEffect(async () => {
        if (!sectors){
            let res = await getStockSector()
            setSectors(res)
        }
    },[])

    return (
        <>
        {
            sectors ? sectors.map(item => 
                <>
                    <div className="sector">{item.sector}
                    </div>
                </>
            ) : null
        }
        </>
    )
}

export default SectorStocks