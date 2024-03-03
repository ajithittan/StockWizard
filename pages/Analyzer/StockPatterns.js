import { useEffect, useState } from "react"
import getStockPatterns from '../../modules/cache/cachestockpatterns'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router'
import StockPatternsMoreInfo from './StockPatternsMoreInfo'
import DispPatternsFormed from './DispPatternsFormed'
import DispPatternHeader from './DispPatternHeader'
import Divider from '@mui/material/Divider';

const StockPatterns = (props) =>{

    const [patterns,setPatterns] = useState(null)
    const [moreInfo,setMoreInfo] = useState(props.moreinfo)
    const [stock,setStock] = useState(null)
    const router = useRouter()

    useEffect(() =>{
        if(props.stock){
            setTimeout(() => {
                const cacheKey = "STK_PTRNS_" + props.stock
                getStockPatterns(cacheKey,{stock:props.stock}).then(retval => {
                    if (retval.length > 0){
                        setPatterns(retval)
                        setStock(props.stock)
                        props.onupdCnt()
                        }
                    }
                )
              }, 10000);
        }
    },[props.stock])

    useState(() =>{
        if (props.patterns){
            setStock(props.patterns[0].stock)
            setPatterns(props.patterns)
        }
    },[props.patterns])

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
                    <Box sx={{ flexGrow: 1,display: props.expand ? "" : "none",margin:"5px"}}       
                        border={0.2}
                        borderColor="gray"
                        borderRadius={1}> 
                        {
                            moreInfo ? <DispPatternHeader stock={stock} datefrom={patterns[0]?.date}></DispPatternHeader> : null
                        } 
                        <Grid container direction='row'>
                            {
                                moreInfo ? null : 
                                    <Grid xs justify = "center">
                                        <Typography color={getColorForPattern()} variant="body1">
                                            <a href="#" onClick={() => showPriceChart(stock)}>
                                            {stock}
                                            </a>
                                        </Typography>
                                        <Typography color={getColorForPattern()} variant="subtitle2">{patterns[0]?.date}</Typography>
                                    </Grid>
                            }                        
                            <Grid xs justify = "center" border={0} borderRight={0.1} borderColor="gray" marginLeft={0.5}>
                                    <Typography color={getColorForPattern()} variant="overline">Patterns</Typography>
                                    <Divider></Divider>
                                    <Grid container direction='row' alignItems="center" justify="center">
                                        <Grid xs justify = "center">
                                            <DispPatternsFormed patterns ={patterns}/>
                                        </Grid>
                                    </Grid>                                                     
                            </Grid>                                
                            {
                                moreInfo? 
                                    <Grid xs justify = "center" marginLeft={0.5}>
                                        <Typography color={getColorForPattern()} variant="overline">More Info</Typography>
                                        <Divider></Divider>
                                        <Grid container direction='row' alignItems="center" justify="center">
                                            <Grid xs justify = "center">
                                                <StockPatternsMoreInfo stock={stock}/>
                                            </Grid>
                                        </Grid>                                                     
                                    </Grid> : null
                            }
                        </Grid>
                    </Box> : null        
            }
        </>
    )

}

export default StockPatterns