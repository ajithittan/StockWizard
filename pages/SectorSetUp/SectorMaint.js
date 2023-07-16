import { useEffect, useState } from "react"
import {CreateStockSector, DeleteStockSector,UpdateStockSectors} from '../../modules/api/StockMaster'
import Sector from './Sector'
import NewSector from './NewSector'
import ModalBox from '../../components/ModalBox'

const SectorMaint = (props) =>{
    const [sectors,setSectors] = useState(null)
    const [showInModal,setShowInModal] = useState(null)

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
        setShowInModal(null)
        setSectors([...sectors.filter(item => item.idstocksector !==sectorId)])
    }

    const updSector = (inpToUpdate) =>{
        let arr = [inpToUpdate]
        UpdateStockSectors(arr)
    }

    const openSectorInModal = (modalData) =>{
        setShowInModal(modalData)
    }

    const getContentToDisplay = (sector,modal) =>{
        let dispProps = modal ? {height:"90%",width:"80%",marginTop:"10px", marginBottom:"30px" ,overflow:'auto',padding:"50px"} :
                                {maxHeight:200,width:250,marginTop:"10px",overflow:'auto'}
        return <Sector dispProps={dispProps} key={sector} details={sector} remove={delSector} update={updSector} 
                openModal={openSectorInModal}></Sector>
    }

    return(
        <div className="sectormaint" >
        {
            sectors ? sectors.map(item =>   
                    (<div>
                                {
                                    getContentToDisplay(item,false)
                                }       
                    </div>)
            ) : null
        }
        {showInModal ? <ModalBox content={getContentToDisplay(showInModal,true)} onClose={() => setShowInModal(false)}></ModalBox> 
                        :null
        }
        <NewSector key={sectors} add={addSector}></NewSector>
        </div>
    )
}

export default SectorMaint