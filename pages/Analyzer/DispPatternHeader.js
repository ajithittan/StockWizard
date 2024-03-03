import StockDetailCardPerformance from '../stocks/StockDetailCardPerformance'
import { useRouter } from 'next/router'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

const DispPatternHeader = (props) =>{

    const router = useRouter()

    const getColorForPattern = () => {
        return "text.secondary"
    }

    const showPriceChart = (stk) => router.push({pathname: '/PriceCharts',query: {stock:stk,dur:12}})

    return(
        <>
        <Grid container>
            <Grid item xs={5}> 
            </Grid>
            <Grid item xs={2}> 
                <Typography color={getColorForPattern()} variant="body1">
                            <a href="#" onClick={() => showPriceChart(props.stock)}>
                            {props.stock}
                            </a>
                </Typography> 
            </Grid>
            <Grid item xs={4}>
                <StockDetailCardPerformance variant="body1" stock={props.stock} datefrom={props.datefrom}></StockDetailCardPerformance>
            </Grid>
        </Grid>
        <Divider></Divider>
        </>
    )
}

export default DispPatternHeader