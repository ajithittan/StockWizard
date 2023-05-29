import { Button } from "@mui/material"
import { useEffect, useState } from "react"
import {SaveNewPositions,checkValidStock} from '../../modules/api/StockMaster'
import StockSymbol from '../../components/StockSymbol'

const ProcessNewPositions = (props) =>{

    const [symbols,setsymbols] = useState(null)
    const [error,setError] = useState(false)

    useEffect(() =>{
        setsymbols([{symbol:null}])
    },[])

    const saveNewPositions = async () =>{
        if (symbols){
            let forDb = symbols.filter(item => item.symbol !== null).map(item => item.symbol)
            if (forDb.length > 0){
                forDb = Array.from(new Set([...forDb]))
                let retval = await SaveNewPositions(forDb)
                if (retval){
                    props.onceSuccess(forDb)
                }
                else{
                    setError(true)
                }
            }
        }
    }

    const addMoreSymbols = () =>{
        let tempsymbols = [...symbols]
        tempsymbols.push({symbol:null})
        setsymbols([...tempsymbols])
    }

    const AddtoList = (stockSym,index) =>{
        let tempsymbols = [...symbols]
        tempsymbols[index].symbol = stockSym
        setsymbols([...tempsymbols])
    }

    return(
        <>
            <span className="textOnPositions">Add stocks that are in your portfolio or hold a position or 
                you just wanna keep an eye on. We'll keep tracking it for you.</span>
            <hr></hr>    
            {
                symbols ? symbols.map((item,index) => <StockSymbol add={AddtoList} sym={item} callBackvals={[index]}/>):null
            }
            <Button  variant="contained" size="small" pt={2} onClick={addMoreSymbols}>+</Button>
            <br></br><br></br><br></br>
            <Button  variant="contained" size="medium" pt={2} onClick={saveNewPositions}>Save</Button>

            <br></br><br></br>
            <span className="textOnPositions">Give it a few mins and we'll get it all synced up.</span>

            {error ? <> <br></br> <span style={{color:"red"}}>Oops....this is embarassing some error occured.</span> </> : null }

        </>
    )
}

export default ProcessNewPositions