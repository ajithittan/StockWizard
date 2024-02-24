import {useEffect, useState} from "react"
import {getCacheCompanyKeyStatsv2} from '../../modules/cache/cachecompanystats'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {getConciseValuesForLargeNums} from '../../modules/utils/UtilFunctions'

const StockAnalyzerChart = (props) =>{
    const [moreDetails,setMoreDetails] = useState(null)

    useEffect(() =>{
        if(props.stock){
            const cacheKey = "COMPANY_STATS_" + props.stock
            getCacheCompanyKeyStatsv2(cacheKey,{'stock':props.stock}).then(retval => setMoreDetails(retval))
        }
    },[props.stock])

    const GridToDisplay = (props1) =>{
        return (
            <Grid xs justify = "center">
                <Typography variant="body2">{props1.label}</Typography>
                    <Grid container direction='row' alignItems="center" justify="center">
                        <Grid xs justify = "center">
                            <Typography color={props1.text > 0 ? null : "red"} variant="subtitle2">{props1.text}</Typography>
                        </Grid>
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
                    <>
                        <GridToDisplay label="Close" text={moreDetails.close}/> 
                        <GridToDisplay label="Change%" text={moreDetails.changepct}/> 
                        <GridToDisplay label="52W-H" text={moreDetails.high52}/> 
                        <GridToDisplay label="52W-L" text={moreDetails.low52}/> 
                        <GridToDisplay label="EPS" text={moreDetails.eps}/> 
                        <GridToDisplay label="MCAP" text={getConciseValuesForLargeNums(moreDetails.marketcap)}/>  
                    </>
                : null
            }
        </>
    )
}

export default StockAnalyzerChart