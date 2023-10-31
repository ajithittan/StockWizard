import { useEffect, useState} from "react"
import { useRouter } from 'next/router'
import WaitingForResonse from '../../components/WaitingForResponse'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useSelector, useDispatch} from 'react-redux'
import {getCompanyStats,modifyCompanyStats} from '../../redux/reducers/companyStatsSlice'
import CompanyDetailsContainer from "./CompanyDetailsContainer"
import CompanyFacts from './CompanyFacts'
import ModeChanger from './ModeChanger'

const index = (props) =>{
    const router = useRouter()
    const dispatch = useDispatch()
    const {companystats} = useSelector((state) => state.companystats)
    const stock = router.query.stock
    const [sizeMul,setSizeMul] = useState(1)
    const [expandType,setExpandType] = useState(null)

    useEffect(() =>{
        if(!companystats){
            dispatch(getCompanyStats())
        }
    },[])

    const getComponentToRender = (inpData) =>{
        let newData = {...inpData,"stock":stock,"expand":setSizeMul,"expandType":setExpandType}
        return (<CompanyDetailsContainer {...newData}></CompanyDetailsContainer>)
    }

    const dispatchTypeChange = (typeOfChange) => dispatch(modifyCompanyStats(typeOfChange))

    const changeAction = (changeType) =>{
        if (changeType === "PERIOD"){
            changePeriod()
        }else if (changeType === "PRICECHART"){
            addPriceChart()
        }
    }

    const addPriceChart = () =>{
        let typeToChange = {}
        if (companystats[0]["addPriceChart"] === true){
            typeToChange.addPriceChart = false
            dispatchTypeChange(typeToChange)
        }else{
            typeToChange.addPriceChart = true
            dispatchTypeChange(typeToChange)        
        }
    }

    const changePeriod = () => {
        let typeToChange = {}
        if (companystats[0]["period"] === "A"){
            typeToChange.period="Q"
            dispatchTypeChange(typeToChange)
        }else{
            typeToChange.period="A"
            dispatchTypeChange(typeToChange)
        }
    }

    return (
            <>
            <Box sx={{ flexGrow: 1,margin:"1%" }}>
                <Grid direction="row" alignItems="stretch" container spacing={{ xs: 1, md: 1 }}>
                    {
                        companystats?.map((item,indx) => 
                        item.type === expandType?
                            <Grid item key={index} xs={12} sm={12} md={6} lg={4*sizeMul} xl={4*sizeMul}>
                                <div>
                                {
                                    stock ? getComponentToRender(item) : <WaitingForResonse></WaitingForResonse>
                                }
                                </div>
                            </Grid> :<Grid item key={index} xs={12} sm={12} md={6} lg={4} xl={4}>
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
            <ModeChanger changeAction={changeAction}></ModeChanger>    
            </>
    )
}

export default index