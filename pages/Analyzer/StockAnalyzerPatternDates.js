import {useEffect, useState} from "react"
import {getCachedRecentPatternsForStock} from '../../modules/cache/cachetopstockpatterns'
import Typography from '@mui/material/Typography';

const StockAnalyzerPatternDates = (props) =>{
    const [pattern,setPattern] = useState(null)

    useEffect(() =>{
        if(props.stock && props.limitDays){
            const cacheKey = "STK_PTRN_" + props.stock + "_" + props.limitDays
            getCachedRecentPatternsForStock(cacheKey,{stock:props.stock,limitdays:props.limitDays}).then(retval => 
                {
                    if (retval && retval.length >0){
                        setPattern(retval)
                    }
                }
            )
        }
    },[props.stock,props.limitDays])

    const formatInput = () =>{
        if (pattern){
            return (
                <>
                    {pattern.map(item => <><Typography variant="caption" noWrap>{item.date}</Typography></>)}
                </>
            )
        }
    }

    return(
        <>
            {formatInput()}
        </>
    )
}

export default StockAnalyzerPatternDates