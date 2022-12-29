import {TextField } from "@mui/material"
import { useEffect,useState } from "react"
import {checkValidStock} from '../modules/api/StockMaster'
import myGif from "../public/loading-loading-forever.gif"
import Image from 'next/image';

const StockSymbol = (props) =>{

    const [symbol,setSymbol] = useState(null)
    const [quoteDtls,setQuoteDtls] = useState(null)
    const [errorSym,setErrorSym] = useState(false)
    const [waiting,setWaiting] = useState(false)

    useEffect(() =>{
        if (props.sym){
            setSymbol(props.sym)
        }
    },[])

    const checkValidStk = async (stock) =>{
        setWaiting(true)
        if (stock.trim() !== "" && (!quoteDtls || quoteDtls.details.Symbol !== stock.trim())){
            let res = await checkValidStock(stock)   
            if (res && res.status){
                setQuoteDtls(res)
                setErrorSym(false)
                props.add(stock,...props.callBackvals)
            }else{
                setErrorSym(true)
            }
        }
        setWaiting(false)
    }

    const processInp = (e) =>{
        if(e.keyCode === 13) { 
            checkValidStk(symbol)
      }
    }

    return (
        <>
            <TextField 
                sx={{width:170}}
                size="small" 
                error={errorSym}
                id="outlined-basic"
                label= {quoteDtls ? quoteDtls.details.ShortName : "Stock" }
                inputProps={{ style: { textTransform: "uppercase" } }}
                variant="outlined" 
                onChange={(e) => {setSymbol(e.target.value.toUpperCase()),setQuoteDtls(null),setWaiting(true)}}
                onBlur={(e) =>checkValidStk(e.target.value.toUpperCase())} 
                onKeyDown={processInp}>{symbol}
            </TextField>
            {waiting ? <Image src={myGif} alt="wait" height={30} width={30} /> : null}
        </>
    )
}

export default StockSymbol