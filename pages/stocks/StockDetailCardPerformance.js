import { useEffect,useState } from "react"
import Typography from '@mui/material/Typography';
import {getCachedPerformanceStkDate} from '../../modules/cache/cachetopstockpatterns'

const StockDetailCardPerformance = (props) =>{
    const [perfdata,setPerfData] = useState(null)

    useEffect(() =>{
        if(props.stock,props.datefrom){
            const cacheKey = "PERF_STK_DT_" + props.stock + "_" + props.datefrom
            getCachedPerformanceStkDate(cacheKey,{stock:props.stock,datefrom:props.datefrom}).then(
                retval => {
                    if (retval && retval.length > 0){
                        setPerfData(Number((retval[retval.length-1].close - retval[0].close).toFixed(2)))
                    }
            
                }
            )
        }
    },[props.stock,props.datefrom])

    return(
        <Typography  variant="caption" color={perfdata > 0 ? "green" : "red"}>{perfdata ? perfdata : 0}</Typography>
    )
}

export default StockDetailCardPerformance