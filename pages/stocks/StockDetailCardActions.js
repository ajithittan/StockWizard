import { useState } from "react"
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import InfoIcon from '@mui/icons-material/Info';
import FeedIcon from '@mui/icons-material/Feed';
import CardActions from '@mui/material/CardActions';
import {removePortfolioStock} from '../../redux/reducers/portfolioStockSlice'
import {remStockFromWatchList} from '../../redux/reducers/profileDashSlice'
import {useDispatch,useSelector} from 'react-redux'
import { useRouter } from 'next/router'
import Grid from '@mui/material/Grid';
import SupportAndResistance from './actions/SupportAndResistance'
import PriceAlerts from './actions/PriceAlerts'
import LatestPatternsFormed from './actions/LatestPatternsFormed'

const StockDetailCardActions = (props) =>{
    const router = useRouter()
    const dispatch = useDispatch()
    const [sizeOfGrid,setSizeOfGrid] = useState(1.5)
    const {watchlistincontext} = useSelector((state) => state.dashboardlayout)

    const showAllCompanyStats = (stk) => router.push({pathname: '/CompanyDetails',query: {stock:stk,dur:3}})

    const defaultActions = <CardActions disableSpacing sx={{ mt: "auto" }} />

    const actionToDelete = () =>{
        if (watchlistincontext){
            dispatch(remStockFromWatchList(props.stock))
        }else{
            dispatch(removePortfolioStock(props.stock))
        }
    }

    return (
            <Grid
            container
            direction="row"
            justify="space-evenly"
            align="stretch"
            >
                <Grid item xs={sizeOfGrid} sm={sizeOfGrid} md={sizeOfGrid} lg={sizeOfGrid} xl={sizeOfGrid}>
                    <IconButton aria-label="reset">
                        <ShowChartIcon color="primary" onClick={() => props.ontypechange("Basic")} />
                    </IconButton>
                </Grid>
                <Grid item xs={sizeOfGrid} sm={sizeOfGrid} md={sizeOfGrid} lg={sizeOfGrid} xl={sizeOfGrid}>
                    <IconButton aria-label="Information">
                        <InfoIcon color="primary" onClick={() => props.ontypechange("Companyinfo")} />
                    </IconButton>
                </Grid>
                <Grid item xs={sizeOfGrid} sm={sizeOfGrid} md={sizeOfGrid} lg={sizeOfGrid} xl={sizeOfGrid}>
                    <IconButton aria-label="Patterns" color="primary">
                        <FeedIcon onClick={() => props.ontypechange("StkNews")}></FeedIcon>
                    </IconButton>                 
                </Grid>                
                <Grid item xs={sizeOfGrid} sm={sizeOfGrid} md={sizeOfGrid} lg={sizeOfGrid} xl={sizeOfGrid}>
                    <SupportAndResistance stock={props.stock} limit={5}/>
                </Grid>
                <Grid item xs={sizeOfGrid} sm={sizeOfGrid} md={sizeOfGrid} lg={sizeOfGrid} xl={sizeOfGrid}>
                    <LatestPatternsFormed stock={props.stock} onshowpatterns={props.ontypechange}></LatestPatternsFormed>
                </Grid>                
                <Grid item xs={sizeOfGrid} sm={sizeOfGrid} md={sizeOfGrid} lg={sizeOfGrid} xl={sizeOfGrid}>
                    <IconButton aria-label="Patterns">
                        <ReadMoreIcon onClick={() => showAllCompanyStats(props.stock)} />
                    </IconButton>                     
                </Grid>
                <Grid item xs={sizeOfGrid} sm={sizeOfGrid} md={sizeOfGrid} lg={sizeOfGrid} xl={sizeOfGrid}>
                    <IconButton aria-label="delete">
                        <DeleteIcon onClick={actionToDelete} />
                    </IconButton>   
                </Grid>
                <Grid item xs={sizeOfGrid} sm={sizeOfGrid} md={sizeOfGrid} lg={sizeOfGrid} xl={sizeOfGrid}>
                    <IconButton aria-label="Expand">
                        <OpenInFullIcon onClick={props.openinfull}/>
                    </IconButton>   
                </Grid>
            </Grid>
           
    )

}

export default StockDetailCardActions