import { useEffect, useState } from "react"
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import InfoIcon from '@mui/icons-material/Info';
import CardActions from '@mui/material/CardActions';
import {removePortfolioStock} from '../../redux/reducers/portfolioStockSlice'
import { useDispatch} from 'react-redux'
import { useRouter } from 'next/router'
import Grid from '@mui/material/Grid';
import StockDetailCardOverlay from './StockDetailCardOverlay'

const StockDetailCardActions = (props) =>{
    const router = useRouter()
    const dispatch = useDispatch()
    const [type,setType] = useState(null)
    const [sizeOfGrid,setSizeOfGrid] = useState(1.6)

    useEffect(() =>{
        if (props.type){
            setType(props.type)
        }
    },[props.type])

    const showAllCompanyStats = (stk) => router.push({pathname: '/CompanyDetails',query: {stock:stk,dur:3}})

    const defaultActions = <CardActions disableSpacing sx={{ mt: "auto" }}>

    </CardActions>

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