import { useEffect, useState } from "react"
import getStockSector from '../../modules/cache/cachesector'
import {CreateStockSector, DeleteStockSector,UpdateStockSectors} from '../../modules/api/StockMaster'
import { useRouter } from 'next/router'
import StockSymbol from '../../components/StockSymbol'
import { Button } from "@mui/material"

const SectorMaint = () =>{
    const router = useRouter()
    const [sectors,setSectors] = useState(null)
    const [inpSec, setInpSec] = useState("Add Sector")
    const [widthOfFieldSet,setwidthOfFieldSet] = useState(50)
    const [stks,setstks] = useState([{stock:""}])
    const [processing,setProcessing] = useState(false)
    const [modifysect, setmodifysect] = useState(null)

    useEffect(async () => {
        if (!sectors){
            let res = await getStockSector()
            console.log("resresresres",res)
            setSectors(res)
            setmodifysect(res)
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

    const addrowstosec = (sectorid) =>{
        let tempindx = modifysect.findIndex(item => item.idstocksector === sectorid)
        let temparr = []
        if (modifysect.filter(item => item.idstocksector === sectorid)[0].newstks){
            temparr = modifysect.filter(item => item.idstocksector === sectorid)[0].newstks
            temparr.push("")
        }else{
            temparr = ["",""]
        }
        modifysect[tempindx].newstks = temparr
        setSectors([...modifysect])
    }

    const addStockToSec = (newStk,sectorid,index) =>{
        if (newStk !==""){
            let tempindx = modifysect.findIndex(item => item.idstocksector === sectorid)
            let temparr = modifysect[tempindx].newstks
            if (temparr){
                temparr[index] = newStk
            }else{
                console.log("here is error....")
                temparr = [newStk]
            }
            modifysect[tempindx].newstks = temparr
            modifysect[tempindx].mod = true
            setSectors([...modifysect])    
        }
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

    const delStock = (sectorId,stock) =>{
        let tempindx = modifysect.findIndex(item => item.idstocksector === sectorId)
        let tempstks = modifysect.filter(item => item.idstocksector === sectorId)[0].stocks
        tempstks = tempstks.filter(item => item !== stock)
        console.log(tempindx,tempstks)
        modifysect[tempindx].stocks = tempstks
        modifysect[tempindx].mod = true
        setSectors([...modifysect])
    }

    const saveUpdates = () =>{
        let modItems = modifysect.filter(item => item.mod === true)
        for (let i=0;i<modItems.length;i++){
            console.log("inside loop")
            if (modItems[i].newstks){
                let finalarr = [...modItems[i].newstks,...modItems[i].stocks]
                let stks = new Set(finalarr)
                console.log(stks)
                modItems[i].stocks = [...stks].filter(item => item.trim() !=="")
                delete modItems[i].newstks
            }
        }
        if (modItems.length > 0){
            UpdateStockSectors(modItems)
        }
        setSectors([...modifysect])
        console.log(modItems)
    }

    const updSecName = (updSec,sectorid) =>{
        let tempindx = modifysect.findIndex(item => item.idstocksector === sectorid)
        modifysect[tempindx].sector = updSec
        modifysect[tempindx].mod = true
        setSectors([...modifysect])
    }

    return(
        <div className="sectormaint" >
        {
            sectors ? sectors.map(item =>   
                    <fieldset>
                        <legend>
                            <input type="text" name={item.sector} className="sectorinput"  value={item.sector} onChange={(e) => updSecName(e.target.value.toUpperCase(),item.idstocksector)}/> 
                            <a href="#" className="sectordelete" title="Remove sector" onClick={() => delSector(item.idstocksector)}>&#10060;</a>
                        </legend>
                        {
                            item.stocks.map((stock,index) => {if (index < 10) {
                                                                            return(<div >{index+1}) {stock} <a href="#" 
                                                                            className="stockdelete" title="Remove stock" 
                                                                            onClick={() => delStock(item.idstocksector,stock)}>x</a>
                                                                            </div>)}})
                        }
                        {
                            item.stocks.length > 10 ? <a href="#" style={{fontSize:"12px",color:"blue"}}>Load More..</a> : null
                        }
                        <div style={{paddingTop:"10px"}}>
                        {
                            item.newstks?
                                item.newstks.map((newitem,index) => 
                                        <div style={{margin:"8px"}}>
                                            <StockSymbol add={addStockToSec} sym={newitem} callBackvals={[item.idstocksector,index]}/>{index === item.newstks.length -1 ? <>&nbsp;<Button  variant="contained" size="small" onClick={() =>addrowstosec(item.idstocksector)}>+</Button></> : null}
                                        </div>) 
                                    :<div style={{margin:"8px"}}>
                                        <StockSymbol add={addStockToSec} callBackvals={[item.idstocksector,0]}/>&nbsp;
                                        <Button  variant="contained" size="small"  onClick={() =>addrowstosec(item.idstocksector)}>+</Button>
                                    </div>
                        }
                        </div>
                    </fieldset>
            ) : null
        }
            <fieldset>
                <legend><input type="text" name="title" className="sectorinputnew" value={inpSec} onClick={(e) => startSector()} onChange={(e) => setInpSec(e.target.value.toUpperCase())}/></legend>
                <div>
                {
                    stks?
                        stks.map((item,index) => 
                                <div style={{marginTop:"8px",marginBottom:"8px"}}>
                                   <StockSymbol add={addStock} callBackvals={[index]}/>
                                   {index === stks.length -1 ? <>&nbsp;<Button  variant="contained" size="small" onClick={() =>addrows()}>+</Button></> : null}
                                </div>) 
                         : null
                }
                <Button  variant="contained" size="small" onClick={(e) => {e.target.disable = true; sendToDb()}}>Create Sector</Button>
                </div>    
            </fieldset>
            {
                    processing ? <div className="sectorprocessing">Updating.....</div> : <input className="sectorprocessing" type="button" name="Save Changes" value="Save Changes" onClick={() => saveUpdates()}/>
            }
        </div>
    )
}

export default SectorMaint