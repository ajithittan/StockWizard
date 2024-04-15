import {useEffect, useState} from "react"
import Grid from '@mui/material/Grid';
import {getCachedRecentPatternsForStock} from '../../modules/cache/cachetopstockpatterns'
import DispPatternsFormed from './DispPatternsFormed'
import Typography from '@mui/material/Typography';

const StockAnalyzerPatterns = (props) =>{
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

    return(
        <>
            {
                pattern ?   
                    <Grid
                        container
                        direction="row"
                        justify="space-evenly"
                        align="stretch"
                        style={{height:"100%"}}
                    >
                        {
                            pattern?.map(item => 
                                        <>
                                        <Grid 
                                         style={{
                                            paddingLeft: '10px',
                                            borderStyle: 'solid',
                                            borderColor: 'rgba(0, 0, 0, 0.12)',
                                            borderWidth: '0 0 0 1px'
                                          }}>
                                            <Typography color="text.secondary" variant="caption">{item.date}</Typography>
                                            <DispPatternsFormed key={item.stockpatterns} patterns={item.stockpatterns} />
                                        </Grid>
                                        </>) 
                        }
                    </Grid> : null
            }
        </>
    )
}

export default StockAnalyzerPatterns