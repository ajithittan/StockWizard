import { useEffect, useState } from "react"
import getTopStockPatterns from '../../modules/cache/cachetopstockpatterns'
import StockPatterns from './StockPatterns'
import Grid from '@mui/material/Grid';

const LatestPatterns = (props) =>{

    const [allPatterns,setAllPatterns] = useState(null)
    const [limitOfRows,setLimitOfRows] = useState(200)

    useEffect(() =>{
        if (!allPatterns){
            const cacheKey = "STK_ALL_PTRNS_" + limitOfRows || 200
            getTopStockPatterns(cacheKey,{limitrows:limitOfRows ||200}).then(retval => {
                if (retval.length > 0){
                        retval.sort((a, b) => a.symbol.localeCompare(b.symbol))
                        setAllPatterns(retval)
                    }
                }
            )
        }
    },[])

    return (
        <div
        style={{borderTop: '1px solid gray', width:"90%",marginLeft:"2%",marginTop:"2%" }}
        >
            <Grid
                container
                direction="row"
                justify="space-evenly"
                align="stretch"
                style={{height:"100%"}}
            >
            {

                allPatterns?.map(item => <Grid xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <StockPatterns patterns={item.stockpatterns} expand={true} ></StockPatterns>
                                        </Grid>
                            ) 
            }
        </Grid>
        </div>
    )
}

export default LatestPatterns