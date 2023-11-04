import { useEffect,useState } from "react"
import {getCompanyProfile} from '../../modules/api/StockDetails'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import {getConciseValuesForLargeNums} from '../../modules/utils/UtilFunctions'
import Grid from '@mui/material/Grid';

const CompanyInformation = (props) =>{

    let [companyinfo,setCompanyInfo] = useState(null)

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(0.6),
        color: theme.palette.text.secondary,
        opacity:0.8
      }));

    useEffect(() =>{
        getCompanyProfile(props.stock).then(retval =>{
            if (retval){
                setCompanyInfo(retval)
            }
        })
    },[props.stock])

    return (
        <Box>
            <Grid direction="row" container spacing={{ xs: 1, md: 1 }}>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                    <Stack spacing={0.5}>
                        <Item>PE: {companyinfo?.pe}</Item>
                        <Item>MCap: {getConciseValuesForLargeNums(companyinfo?.marketcap)}</Item>
                        <Item>EPS: {getConciseValuesForLargeNums(companyinfo?.eps)}</Item>
                        <Item>52W H: {companyinfo?.high52}</Item>                        
                    </Stack>    
                </Grid>        
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                    <Stack spacing={0.5}>
                        <Item>Volume: {getConciseValuesForLargeNums(companyinfo?.volume)}</Item>
                        <Item>Avg Vol: {getConciseValuesForLargeNums(companyinfo?.volumeavg)}</Item>
                        <Item>Shares: {getConciseValuesForLargeNums(companyinfo?.shares)}</Item>
                        <Item>52W L: {companyinfo?.low52}</Item>
                    </Stack>    
                </Grid>        
            </Grid>
        </Box>
    )

}

export default CompanyInformation