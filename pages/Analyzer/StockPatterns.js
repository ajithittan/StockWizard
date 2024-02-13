import { useEffect, useState } from "react"
import getStockPatterns from '../../modules/cache/cachestockpatterns'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router'

const StockPatterns = (props) =>{

    const [patterns,setPatterns] = useState(null)
    const router = useRouter()
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? "none" : "none",
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height:"100%"
      }));

    useEffect(() =>{
        if(props.stock){
            const cacheKey = "STK_PTRNS_" + props.stock
            getStockPatterns(cacheKey,{stock:props.stock}).then(retval => {
                if (retval.length > 0){
                    setPatterns(retval)
                    }
                }
            )
        }
    },[props.stock])

    const showPriceChart = (stk) => router.push({pathname: '/PriceCharts',query: {stock:stk,dur:12}})

    return(
        <>
            { 
                patterns?
                    <Box sx={{ flexGrow: 1}}       
                        border={0.2}
                        borderTop={0}
                        borderLeft={0}
                        borderRight={0}
                        borderColor="primary.main">
                        <Grid container direction='row' alignItems="center" justify="center">
                            <Grid xs justify = "center">
                                <Typography color="text.secondary" variant="body1">
                                    <a href="#" onClick={() => showPriceChart(props.stock)}>
                                    {props.stock}
                                    </a>
                                </Typography>
                                <Typography color="text.secondary" variant="subtitle2">{patterns[0]?.date}</Typography>
                            </Grid>
                            {
                                patterns?.map(eachpattern =>
                                    <Grid xs justify = "center">
                                        <Typography color="text.primary" variant="body2">{eachpattern.type}</Typography>
                                            <Grid container direction='row' alignItems="center" justify="center">
                                            {
                                                eachpattern.bullishpatterns.map(eachbull => 
                                                    <Grid xs justify = "center">
                                                        <Typography color="text.secondary" variant="subtitle2">{eachbull}</Typography>
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