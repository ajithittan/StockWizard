import { useEffect,useState } from "react"
import getCachedSimpleMovAvgs from '../../modules/cache/cacheindicators'

const MovingAvg = (props) =>{

    const [movAvgs, setmovAvgs] = useState(null)

    useEffect(async () =>{
        if (props.symbol){
            const cacheKey = "SMA" + props.symbol + "_" + 1
            let res = await getCachedSimpleMovAvgs(cacheKey,{'stock':props.symbol,'last':1})
            if (res.SMA_20){
                setmovAvgs(res[props.type])
            }else{
                setmovAvgs("-")
            }    
        }        
    },[props.symbol])

    return(
        <>
            {movAvgs ? <span>{movAvgs}</span> : <span>loading...</span> }
        </>
    )

}

export default MovingAvg