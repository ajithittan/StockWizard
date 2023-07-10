import { useEffect, useState } from "react"
import {CreateStockSector, DeleteStockSector,UpdateStockSectors} from '../../modules/api/StockMaster'
import Sector from './Sector'
import NewSector from './NewSector'

const SectorMaint = (props) =>{
    const [sectors,setSectors] = useState(null)

    useEffect(() => {
        if (!sectors && props.sectors){
            setSectors(props.sectors)
        }
    },[props.sectors])

    const addSector = async (inpNewSector) =>{
        let retval = await CreateStockSector(inpNewSector)
        setSectors([...sectors,retval])
    }

    const delSector = async (sectorId) =>{
        let retval = await DeleteStockSector(sectorId)
        setSectors([...sectors.filter(item => item.idstocksector !==sectorId)])
    }

    const updSector = (inpToUpdate) =>{
        let arr = [inpToUpdate]
        UpdateStockSectors(arr)
    }

    return(
        <div className="sectormaint" >
        {
            sectors ? sectors.map(item =>   
                    (<div>
                        <Sector key={item} details={item} remove={delSector} update={updSector}></Sector>
                    </div>)
            ) : null
        }
        <NewSector key={sectors} add={addSector}></NewSector>
        </div>
    )
}

export default SectorMaint