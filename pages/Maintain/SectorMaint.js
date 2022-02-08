import { useEffect, useState } from "react"
import getStockSector from '../../modules/cache/cachesector'

const SectorMaint = () =>{
    const [sectors,setSectors] = useState(null)
    const [inpSec, setInpSec] = useState("Add Sector")
    const [widthOfFieldSet,setwidthOfFieldSet] = useState(50)

    useEffect(async () => {
        if (!sectors){
            let res = await getStockSector()
            setSectors(res)
        }
    },[])

    return(
        <div className="sectormaint" >
        {
            sectors ? sectors.map(item => 
                    <fieldset>
                        <legend>{item.sector}</legend>
                        {
                            item.stocks.map((item,index) => <div >{index+1}) {item}</div>)
                        }
                    </fieldset>
            ) : null
        }
        <fieldset style={{width:widthOfFieldSet}}>
            <legend><input type="text" name="title" value={inpSec} onClick={(e) => {e.target.value="",setwidthOfFieldSet(60)}} onChange={(e) => setInpSec(e.target.value)}/></legend>
            <div>
                <input type="text" name="stockname" style={{width:'100px'}} />&nbsp;&nbsp; +
            </div>
        </fieldset>
        </div>
    )
}

export default SectorMaint