import { Button,TextField } from "@mui/material"
import { useEffect, useState } from "react"
import {SaveNewPositions} from '../../modules/api/StockMaster'

const ProcessNewPositions = (props) =>{

    const [symbols,setsymbols] = useState(null)
    const [error,setError] = useState(false)

    useEffect(() =>{
        setsymbols([{symbol:null}])
    },[])

    const saveNewPositions = async () =>{
        if (symbols){
            let forDb = symbols.filter(item => item.symbol !== null).map(item => item.symbol)
            console.log("forDb",forDb)
            if (forDb.length > 0){
                forDb = Array.from(new Set([...forDb]))
                let retval = await SaveNewPositions(forDb)
                if (retval){
                    props.onceSuccess()
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

    const AddtoList = (e,index) =>{
        console.log(e.target.value,index)
        let tempsymbols = [...symbols]
        tempsymbols[index].symbol = e.target.value
        setsymbols([...tempsymbols])
    }

    return(
        <>
            <span className="textOnPositions">Add stocks that are in your portfolio or hold a position or 
                you just wanna keep an eye on. We'll keep tracking it for you.</span>
            <hr></hr>    
            {
                symbols? 
                symbols.map((item,index) => (
                                            <TextField id="outlined-basic" label="Stock" 
                                               variant="outlined" size="medium" onChange={(e) =>AddtoList(e,index)}>{item.symbol}</TextField>
                                    )

                ):null
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