import { useEffect, useState } from "react"
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import InfoIcon from '@mui/icons-material/Info';
import CardActions from '@mui/material/CardActions';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {removePortfolioStock} from '../../redux/reducers/portfolioStockSlice'
import {getNotificationsForChart,HIDE_ADDED_ITEMS_FROM_DB} from '../../redux/reducers/chartDataSlice'
import {useSelector, useDispatch,shallowEqual} from 'react-redux'
import { useRouter } from 'next/router'
import Grid from '@mui/material/Grid';

const StockDetailCardActions = (props) =>{
    const router = useRouter()
    const dispatch = useDispatch()
    const [sizeOfGrid,setSizeOfGrid] = useState(1.6)
    const [clicked,setClicked] = useState(false)

    const showAllCompanyStats = (stk) => router.push({pathname: '/CompanyDetails',query: {stock:stk,dur:3}})

    const stockAlerts = useSelector((state) => state.stockalerts?.stockalerts?.find(m=> {
        return m.symbol === props.stock
    }), shallowEqual)

    const defaultActions = <CardActions disableSpacing sx={{ mt: "auto" }} />

    const arrOfActions = {"Basic":defaultActions,"Companyinfo":defaultActions}

    return (
            <Grid
            container
            direction="row"
            justify="space-evenly"
            align="stretch"
            >
                <Grid item xs={sizeOfGrid} sm={sizeOfGrid} md={sizeOfGrid} lg={sizeOfGrid} xl={sizeOfGrid}>
                    <IconButton aria-label="reset">
                        <ShowChartIcon onClick={() => props.ontypechange("Basic")} />
                    </IconButton>
                </Grid>
                <Grid item xs={sizeOfGrid} sm={sizeOfGrid} md={sizeOfGrid} lg={sizeOfGrid} xl={sizeOfGrid}>
                    {
                        clicked ? <IconButton aria-label="reset">
                                    <NotificationsIcon  color={stockAlerts?.alerts?.length > 0 ? "primary" : "secondary"} 
                                    onClick={() => {dispatch(HIDE_ADDED_ITEMS_FROM_DB(stockAlerts?.alerts)),setClicked(false)}}/>
                                  </IconButton> : 
                                  <IconButton aria-label="reset">
                                    <NotificationsIcon  color={stockAlerts?.alerts?.length > 0 ? "primary" : "secondary"} 
                                    onClick={() => {
                                        dispatch(getNotificationsForChart(stockAlerts?.alerts));
                                        if (stockAlerts?.alerts?.length > 0){
                                            setClicked(true)
                                        }
                                    }}/>
                                  </IconButton>
                    }
                </Grid>
                <Grid item xs={sizeOfGrid} sm={sizeOfGrid} md={sizeOfGrid} lg={sizeOfGrid} xl={sizeOfGrid}>
                    <IconButton aria-label="Information">
                        <InfoIcon onClick={() => props.ontypechange("Companyinfo")} />
                    </IconButton>
                </Grid>
                <Grid item xs={sizeOfGrid} sm={sizeOfGrid} md={sizeOfGrid} lg={sizeOfGrid} xl={sizeOfGrid}>
                    <IconButton aria-label="More Information">
                        <ReadMoreIcon onClick={() => showAllCompanyStats(props.stock)} />
                    </IconButton>                     
                </Grid>
                <Grid item xs={sizeOfGrid} sm={sizeOfGrid} md={sizeOfGrid} lg={sizeOfGrid} xl={sizeOfGrid}>
                    <IconButton aria-label="delete">
                        <DeleteIcon onClick={() => dispatch(removePortfolioStock(props.stock))} />
                    </IconButton>   
                </Grid>
            </Grid>
           
    )

}

export default StockDetailCardActions