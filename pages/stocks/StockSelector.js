import { useState } from "react"
import {TextField} from "@mui/material"

const StockSelector = (props) =>{

    const [stock,setStock] = useState("Stock")
    const [valid,setValid] = useState(false)

    const checkForValidity = () =>{
        props.updStock(stock)
        if (stock !== ""){
            setValid(true)
        }
    }

    return (
        <TextField id="outlined-basic" label="Stock" variant="outlined" size="small" 
            onChange={(e) => setStock(e.target.value)} onBlur={checkForValidity}>{stock}</TextField>
    )

}
export default StockSelector