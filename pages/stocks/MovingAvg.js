import { useEffect,useState } from "react"
import getCachedSimpleMovAvgs from '../../modules/cache/cacheindicators'

const MovingAvg = (props) =>{

    const [movAvgs, setmovAvgs] = useState(null)

    useEffect(() =>{
        if (props.symbol){
            const cacheKey = "SMA" + props.symbol + "_" + 1
            getCachedSimpleMovAvgs(cacheKey,{'stock':props.symbol,'last':1}).then(res =>{
                if (res.SMA_20){
                    setmovAvgs(res[props.type])
                }else{
                    setmovAvgs("-")
                }        
            })
        }        
    },[props.symbol])

    return(
        <>
            {movAvgs ? <>{movAvgs}</> : <>loading...</> }
        </>
    )

}

export default MovingAvg