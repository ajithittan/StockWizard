import { useEffect,useState } from "react"
import {getSimpleMovingAverages} from '../../modules/api/StockIndicators'

const MovingAvg = (props) =>{

    const [movAvgs, setmovAvgs] = useState(null)

    useEffect(async () =>{
        (props.symbol)
        let res = await getSimpleMovingAverages(props.symbol,1)
        if (res.SMA_20){
            setmovAvgs(res[props.type])
        }else{
            setmovAvgs("-")
        }
        
    },[props.symbol])

    return(
        <>
            {movAvgs ? <span>{movAvgs}</span> : <span>loading...</span> }
        </>
    )

}

export default MovingAvg