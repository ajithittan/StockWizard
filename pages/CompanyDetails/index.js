import { useEffect, useState } from "react"
import CompanyRevenue from './CompanyRevenue'
import { useRouter } from 'next/router'
import WaitingForResonse from '../../components/WaitingForResponse'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useSelector, useDispatch} from 'react-redux'
import {getCompanyStats} from '../../redux/reducers/companyStatsSlice'
import CompanyDetailsContainer from "./CompanyDetailsContainer"
import CompanyFacts from './CompanyFacts'

const index = (props) =>{
    const router = useRouter()
    const dispatch = useDispatch()
    const {companystats} = useSelector((state) => state.companystats)
    const stock = router.query.stock

    useEffect(() =>{
        if(!companystats){
            dispatch(getCompanyStats())
        }
    },[])

    const getComponentToRender = (inpData) =>{
        let newData = {...inpData,"stock":stock}
        return (<CompanyDetailsContainer {...newData}></CompanyDetailsContainer>)
    }

    return (
            <Box sx={{ flexGrow: 1,margin:"1%" }}>
                <Grid direction="row" alignItems="stretch" container spacing={{ xs: 1, md: 1 }}>
                    {
                        companystats?.map(item => 
                            <Grid item key={index} xs={12} sm={12} md={6} lg={4} xl={4}>
                                {stock ? 
                                    getComponentToRender(item) : <WaitingForResonse></WaitingForResonse>}
                            </Grid>        
                        )
                    }
                    <Grid item key={index} xs={12} sm={12} md={4} lg={3} xl={3}>
                        <CompanyFacts></CompanyFacts>
                    </Grid>        
                </Grid>
            </Box>         
    )
}

export default index