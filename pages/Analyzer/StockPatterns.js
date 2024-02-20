import { useEffect, useState } from "react"
import getStockPatterns from '../../modules/cache/cachestockpatterns'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router'

const StockPatterns = (props) =>{

    const [patterns,setPatterns] = useState(null)
    const [stock,setStock] = useState(null)
    const router = useRouter()

    useEffect(() =>{
        if(props.stock){
            const cacheKey = "STK_PTRNS_" + props.stock
            getStockPatterns(cacheKey,{stock:props.stock}).then(retval => {
                if (retval.length > 0){
                    setPatterns(retval)
                    setStock(props.stock)
                    props.onupdCnt()
                    }
                }
            )
        }
    },[props.stock])

    useState(() =>{
        if (props.patterns){
            setStock(props.patterns[0].stock)
            setPatterns(props.patterns)
        }
    },[props.patterns])

    const showPriceChart = (stk) => router.push({pathname: '/PriceCharts',query: {stock:stk,dur:12}})

    const getColorForPattern = () => {
        if(patterns.length > 2 && props.textcolor){
            return "blue"
        } else {
            return "text.secondary"
        }
    }

    return(
        <>
            { 
                patterns?
                    <Box sx={{ flexGrow: 1,display: props.expand ? "" : "none"}}       
                        border={0.2}
                        borderTop={0}
                        borderLeft={0}
                        borderRight={0}
                        borderColor="primary.main">
                        <Grid container direction='row' alignItems="center" justify="center">
                            <Grid xs justify = "center">
                                <Typography color={getColorForPattern()} variant="body1">
                                    <a href="#" onClick={() => showPriceChart(stock)}>
                                    {stock}
                                    </a>
                                </Typography>
                                <Typography color={getColorForPattern()} variant="subtitle2">{patterns[0]?.date}</Typography>
                            </Grid>
                            {
                                patterns?.map(eachpattern =>
                                    <Grid xs justify = "center">
                                        <Typography color={getColorForPattern()} variant="body2">{eachpattern.type}</Typography>
                                            <Grid container direction='row' alignItems="center" justify="center">
                                            {
                                                eachpattern.bullishpatterns.map(eachbull => 
                                                    <Grid xs justify = "center">
                                                        <Typography color={getColorForPattern()} variant="subtitle2">{eachbull}</Typography>
                                                    </Grid>
                                                )
                                            }
                                        </Grid>                                                     
                                    </Grid>
                                )
                            }
                        </Grid>
                    </Box> : null        
            }
        </>
    )

}

export default StockPatterns