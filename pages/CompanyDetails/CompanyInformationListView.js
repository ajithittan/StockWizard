import { useEffect,useState } from "react"
import {getCompanyProfile} from '../../modules/api/StockDetails'
import Box from '@mui/material/Box';
import {getConciseValuesForLargeNums} from '../../modules/utils/UtilFunctions'
import Grid from '@mui/material/Grid';
import moment from 'moment';
import Typography from '@mui/material/Typography';

const CompanyInformationListView = (props) =>{

    let [companyinfo,setCompanyInfo] = useState(null)

    useEffect(() =>{
        getCompanyProfile(props.stock).then(retval =>{
            if (retval){
                setCompanyInfo(retval)               
                const timestampObj = moment.unix(retval?.tradetime).format('MM-DD-YYYY HH:mm:ss');
                props.setSubHeader(<>{retval?.companyname}<br/><div style={{fontSize:12}}>{timestampObj}</div></>)
            }
        })
    },[props.stock])

    return (
        <Box>
            <Grid direction="row" container spacing={{ xs: 1, md: 1 }}>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                    <Grid direction="row" container spacing={{ xs: 1, md: 1 }}>
                        <Grid item><Typography color="text.secondary" variant="caption">PE: {companyinfo?.pe}</Typography></Grid> 
                        <Grid item><Typography color="text.secondary" variant="caption">MCap: {getConciseValuesForLargeNums(companyinfo?.marketcap)}</Typography></Grid>
                        <Grid item><Typography color="text.secondary" variant="caption">EPS: {getConciseValuesForLargeNums(companyinfo?.eps)}</Typography></Grid>
                        <Grid item><Typography color="text.secondary" variant="caption">52W H: {companyinfo?.high52}</Typography></Grid>                 
                    </Grid>  
                </Grid>        
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                    <Grid direction="row" container spacing={{ xs: 1, md: 1 }}>
                        <Grid item><Typography color="text.secondary" variant="caption">Volume: {getConciseValuesForLargeNums(companyinfo?.volume)}</Typography></Grid> 
                        <Grid item><Typography color="text.secondary" variant="caption">Avg Vol: {getConciseValuesForLargeNums(companyinfo?.volumeavg)}</Typography></Grid>
                        <Grid item><Typography color="text.secondary" variant="caption">Shares: {getConciseValuesForLargeNums(companyinfo?.shares)}</Typography></Grid>
                        <Grid item><Typography color="text.secondary" variant="caption">52W L: {companyinfo?.low52}</Typography></Grid>   
                    </Grid>  
                </Grid>        
            </Grid>
        </Box>
    )

}

export default CompanyInformationListView