import { useEffect,useState} from "react"
import {getCachedRecentPatternsForStock} from '../../modules/cache/cachetopstockpatterns'
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import StockDetailCardPerformance from './StockDetailCardPerformance'
 
const StockDetailCardPatterns = (props) =>{

    const [limitDays,setLimitDays] = useState(10)
    const [patternsFormed,setPatternsFormed] = useState(null)

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(0.6),
        color: theme.palette.text.secondary,
        opacity:0.8
      }));

    useEffect(() =>{
        if(props.stock && !patternsFormed){
            const cacheKey = "STK_PTRN_" + props.stock + "_" + limitDays || 10
            getCachedRecentPatternsForStock(cacheKey,{stock:props.stock,limitdays:limitDays || 10}).then(retval => 
                {
                    if (retval && retval.length >0){
                        setPatternsFormed(retval)
                    }
                }
            )
        }
    },[props.stock])

    const stripDown = (inpval) =>{
        const strippedvals = {middle:"M",lower:"L"}
        if (strippedvals[inpval])
        return strippedvals[inpval]
        else if (inpval.indexOf( "CrossOver" ) > -1) {
            return "CO-" + inpval.split('-')[1]
        }else if (inpval.indexOf( "CDL" ) > -1) {
            return inpval.split('CDL')[1]
        }
        else{
            return inpval
        }
    }

    const sortPatternTypes = (inpTypes) =>{
        let sortedVals = []
        const sortedPattern = ["CLASS_MDL","BB","MACD","RSI","OBV"]
        sortedPattern.forEach(item =>{
            let tempPtntps = inpTypes.filter(eachPattern => eachPattern.type.indexOf(item) > -1)

            if (tempPtntps.length > 0){
                sortedVals.push(...tempPtntps)
                inpTypes.splice(inpTypes.findIndex(eachPattern => eachPattern.type.indexOf(item) > -1), 1);
            }
        })
        return ([...sortedVals,...inpTypes])
    }

    const GetItemContent = (props1) =>{
        let size = 9/props1?.inpvals?.stockpatterns.length
        let patterndata = props1?.inpvals?.stockpatterns
        patterndata = sortPatternTypes([...patterndata])
        return(
            <>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Divider></Divider>
            </Grid>
            <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                <Typography  variant="caption">{props1.inpvals.date}</Typography>
                <Grid container direction='column'>
                        <Grid >
                            <StockDetailCardPerformance stock={props.stock} datefrom={props1.inpvals.date}></StockDetailCardPerformance>
                        </Grid>
                    </Grid>  
            </Grid>  
            {
                patterndata?.map(eachpattern =>
                    <Grid item xs={size} sm={size} md={size} lg={size} xl={size}>
                        <Typography variant="caption">{eachpattern.type}</Typography>
                            <Grid container direction='column'>
                            {
                                eachpattern.bullishpatterns.map(eachbull => 
                                    <Grid >
                                        <Typography variant="caption">{stripDown(eachbull.toString())}</Typography>
                                    </Grid>
                                )
                            }
                        </Grid>                                                     
                    </Grid>
                )
            } 
            </>    
        )
    }

    return (
        <Grid direction="row" container spacing={{ xs: 1, md: 1 }}>
            {
                patternsFormed?.map(inp => <GetItemContent inpvals={inp}></GetItemContent>)
            }      
        </Grid>
    )
}

export default StockDetailCardPatterns