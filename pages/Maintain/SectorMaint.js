import { useEffect, useState } from "react"
import getStockSector from '../../modules/cache/cachesector'
import {CreateStockSector, DeleteStockSector} from '../../modules/api/StockMaster'
import { useRouter } from 'next/router'
import Image from 'next/image'

const SectorMaint = () =>{
    const router = useRouter()
    const [sectors,setSectors] = useState(null)
    const [inpSec, setInpSec] = useState("Add Sector")
    const [widthOfFieldSet,setwidthOfFieldSet] = useState(50)
    const [stks,setstks] = useState([{stock:""}])
    const [processing,setProcessing] = useState(false)

    useEffect(async () => {
        if (!sectors){
            let res = await getStockSector()
            setSectors(res)
        }
    },[])

    const startSector = () =>{
        setInpSec("")
        setwidthOfFieldSet(60)
    }

    const addStock = (val,index) =>{
        stks[index].stock = val
        setstks([...stks])
    }

    const addrows = () =>{
        stks.push({stock:""})
        setstks([...stks])
    }

    const reload = async () =>{
        router.reload(window.location.pathname)
    }
    const sendToDb = async () =>{
        console.log(stks)
        let sendVal = {}
        sendVal.sector = inpSec
        sendVal.stocks = stks.filter(item => item.stock !=="").map(item => item.stock)
        if (sendVal.stocks.length > 0){
            setProcessing(true)
            let retval = await CreateStockSector(sendVal)
            reload()        
        }
    }

    const delSector = async (sectorId) =>{
        setProcessing(true)
        let retval = await DeleteStockSector(sectorId)
        reload()
    }

    return(
        <div className="sectormaint" >
        {
            sectors ? sectors.map(item =>   
                    <fieldset>
                        <legend>
                            <input type="text" name="title" className="sectorinput"  value={item.sector} onClick={(e) => startSector()} onChange={(e) => setInpSec(e.target.value)}/> 
                            <a href="#" className="sectordelete" title="Remove sector" onClick={() => delSector(item.idstocksector)}>&#10006;</a>
                        </legend>
                        {
                            item.stocks.map((item,index) => <div >{index+1}) {item}</div>)
                        }
                    </fieldset>
            ) : null
        }
            <fieldset style={{width:widthOfFieldSet}} >
                <legend><input type="text" name="title" className="sectorinputnew" value={inpSec} onClick={(e) => startSector()} onChange={(e) => setInpSec(e.target.value)}/></legend>
                
                {
                    stks?
                        stks.map((item,index) => 
                                <div>
                                   <input type="text" name="stockname" style={{width:'100px'}} onChange={(e) => addStock(e.target.value,index)}/>&nbsp;&nbsp; {index === stks.length -1 ? <a href="#" onClick={() =>addrows()}>+</a> : null}
                                </div>) 
                         : null
                }
                <input className="sectorbutton" type="button" value="Create Sector" onClick={(e) => {e.target.disable = true; sendToDb()}} />
            </fieldset>
            {
                    processing ? <div className="sectorprocessing">Updating.....</div> : null
            }
        </div>
    )
}

export default SectorMaint