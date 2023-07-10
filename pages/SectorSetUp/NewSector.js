import { useRef, useState } from "react"
import {DeleteStockSector} from '../../modules/api/StockMaster'
import StockSymbolSelector from '../../components/StockSymbolSelector'
import TextField from '@mui/material/TextField';

const NewSector = (props) =>{
    const defaultName = "New Sector"
    let sectorObj = {}
    let [name,setName] = useState(defaultName)
    let [stocks,setStocks] = useState(null)
    let sectorName = useRef()

    const updStks = (updatedStks) => {
        setStocks(updatedStks)
        sectorObj.sector = sectorName.current.value.toUpperCase()
        sectorObj.stocks = Array.from(new Set(updatedStks))
        props.add(sectorObj)
    }

    const updName = (e) => setName(e.target.value.toUpperCase())
        
    return (
        <div style={{margin:"20px"}}>
            <TextField inputProps={{style: {fontWeight:"bold"}}}  inputRef={sectorName} InputLabelProps={{shrink: false}} 
                       id="standard-basic" variant="standard" value={name} onChange={updName} 
                       onClick={() => name === defaultName ? setName("") : null}/>
            <StockSymbolSelector limitToShow={4} width={250} updates={updStks} initialset={stocks || []} />
        </div>
    )
}

export default NewSector