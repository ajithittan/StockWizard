import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import MovingAvg from './MovingAvg'
import Typography from '@mui/material/Typography';
import { useEffect, useState } from "react"
import { useRouter } from 'next/router'
import {DeleteStkFromPositions} from '../../modules/api/StockMaster'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import useMediaQuery from '@mui/material/useMediaQuery';
import BasicContentStockDetail from './BasicContentStockDetail'
import CompanyQtrPerf from './CompanyQtrPerf'
import {intToString} from '../../modules/utils/UtilFunctions'

const StockDetailCard = (props) => {
    const [stkQuote,setStkQuote] = useState(null)
    const [stock,setStock] = useState(null)
    const router = useRouter()
    const [type,setType] = useState("Basic")
    const sm = useMediaQuery("(max-width: 960px)");

    let cardStyle = {
        display: 'block',
        height: sm ? "90%" : "350px",
        width: sm ? "90%" : "400px", 
        transitionDuration: '0.3s',
        marginLeft: sm ? "10px" : "30px",
        marginTop: sm ? "10px" : "15px",
        paddingLeft: sm ? "5%" : "1px",
        backgroundColor: stkQuote?.perchange.toFixed(2) > 0 ? "#F5FEF8" :"#FFF8F9",
        color:'text.secondary',
        alignItems:"center",
    }

    useEffect(() => {
        if(props.stock){
            setStock(props.stock)
        }
    },[props.stock])

    useEffect(() => {
       if (props.stockQuote){
            setStkQuote(props.stockQuote)
       } 
    },[props.stockQuote])

    const showPriceChart = (stk) =>{
        router.push({pathname: '/PriceCharts',query: {stock:stk,dur:3}})
    }

    const stopTrackingStk = () =>{
        props.remove(stock)
        let res = DeleteStkFromPositions(stock)
    }

    const getContent = () =>{
        let retVal = {
            "Basic":<BasicContentStockDetail stock={stock}/>,
            "Earnings": <CompanyQtrPerf stock={stock}/> }
        return retVal[type]
    }

    return (
      <Card style={cardStyle}>
        <CardContent>
          <Typography style={{cursor:"pointer"}} gutterBottom onClick={() => showPriceChart(stock)}>
            {stock ? stock : "Looking"} - {stkQuote ? "$" + stkQuote.close : "Looking"} 
            ({stkQuote ? stkQuote.perchange.toFixed(2) : "Looking"}%) 
            ({stkQuote ? intToString(stkQuote.volume) : "Looking"})
          </Typography>
          <div style={{height:"80%"}}>
              {getContent()}
          </div>
          <CardActions>
                <IconButton aria-label="reset">
                    <ShowChartIcon onClick={() => setType("Basic")} />
                </IconButton>
                <IconButton aria-label="earnings">
                    <AttachMoneyIcon onClick={() => setType("Earnings")} />
                </IconButton>
                <IconButton aria-label="delete">
                    <DeleteIcon onClick={stopTrackingStk} />
                </IconButton>
          </CardActions>
        </CardContent>
      </Card>
    );
  }

export default StockDetailCard
