import {useEffect, useState} from "react"
import {getCacheCompanyKeyStatsv2} from '../../modules/cache/cachecompanystats'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {getConciseValuesForLargeNums} from '../../modules/utils/UtilFunctions'

const StockPatternsMoreInfo = (props) =>{
    const [moreDetails,setMoreDetails] = useState(null)

    useEffect(() =>{
        if(props.stock){
            const cacheKey = "COMPANY_STATS_" + props.stock
            getCacheCompanyKeyStatsv2(cacheKey,{'stock':props.stock}).then(retval => setMoreDetails(retval))
        }
    },[props.stock])

    const getColorForPattern = () => {
              return "text.secondary"
    }

    const GridToDisplay = (props1) =>{
        return (
                <Grid container direction='row'>
                    <Grid xs justify = "center">
                        <Typography color={getColorForPattern()} variant="caption">{props1.label}</Typography>
                    </Grid>
                    <Grid xs justify = "center">
                        <Typography color={getColorForPattern()} variant="caption">{props1.text}</Typography>
                    </Grid>                            
                </Grid>                                                     
            )
    }

    return(
        //{"symbol":"ABCL","marketcap":1294867624,"eps":-0.45,"priceopen":4.64,"changepct":-4.79,"high52":14.97,
        //"volume":1428865,"shares":290170000,"high":4.78,"low":4.44,"pe":"#N/A","low52":3.87,
        //"volumeavg":1599198,"close":4.47,"tradetime":1699286400.0000005,"companyname":"AbCellera Biologics Inc."}
        <>
            {
                moreDetails ? 
                <Grid xs justify = "center">
                        <GridToDisplay label="52W-H" text={moreDetails.high52}/> 
                        <GridToDisplay label="52W-L" text={moreDetails.low52}/> 
                        <GridToDisplay label="EPS" text={moreDetails.eps}/> 
                        <GridToDisplay label="PE" text={moreDetails.pe}/> 
                        <GridToDisplay label="MCAP" text={getConciseValuesForLargeNums(moreDetails.marketcap)}/>                                                 
                </Grid>
                : null
            }
        </>
    )
}

export default StockPatternsMoreInfo