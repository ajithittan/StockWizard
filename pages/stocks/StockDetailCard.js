import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from "react"
import { useRouter } from 'next/router'
import {DeleteStkFromPositions} from '../../modules/api/StockMaster'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import useMediaQuery from '@mui/material/useMediaQuery';
import CompanyQtrPerf from './CompanyQtrPerf'
import CardHeader from '@mui/material/CardHeader'
import CompanyStockPrice from './CompanyStockPrice'
import MovingAvg from './MovingAvg'
import CompanyQtrPerfBarChart from './CompanyQtrPerfBarChart'

const StockDetailCard = (props) => {
    const [stkQuote,setStkQuote] = useState(null)
    const [stock,setStock] = useState(null)
    const router = useRouter()
    const [type,setType] = useState("Basic")
    const sm = useMediaQuery("(max-width: 960px)");

    let cardStyle = {
        height:"90%",
        //width: '10vw',
        transitionDuration: '0.3s',
        //height: '20vw',
        //display: 'block',
        //height: sm ? "80%" : "300px",
        //width: sm ? "80%" : "300px", 
        transitionDuration: '0.3s',
        //marginLeft: sm ? "10px" : "15px",
        marginTop: sm ? "10px" : "15px",
        //paddingLeft: sm ? "5%" : "1px",
        backgroundColor: stkQuote?.perchange?.toFixed(2) > 0 ? "#F5FEF8" :"#FFF8F9",
        color:'text.secondary',
        alignItems:"center",
    }

    useEffect(() => {
        if(props.stock){
            setStock(props.stock)
        }
    },[props.stock])

    useEffect(() => {
        if (props.streamedQuotes){
            setStkQuote(props.streamedQuotes)
        }
       else if (props.stockQuote){
            setStkQuote(props.stockQuote)
       } 
    },[props.stockQuote,props.streamedQuotes])

    const showPriceChart = (stk) =>{
        router.push({pathname: '/CompanyDetails',query: {stock:stk,dur:3}})
    }

    const stopTrackingStk = () =>{
        props.remove(stock)
        let res = DeleteStkFromPositions(stock)
    }

    const getContent = () =>{
        let retVal = {
            "Basic":<CompanyStockPrice stock={stock} duration={3}></CompanyStockPrice>,
            "Earnings": <CompanyQtrPerfBarChart stock={stock}/> }
        return retVal[type]
    }

    const getsubheader = () => <>
        <MovingAvg symbol = {props.stock} type={"SMA_50"}/>(50D)&nbsp;&nbsp;&nbsp;
        <MovingAvg symbol = {props.stock} type={"SMA_200"}/>(200D)
    </>

    const gettitle = () => <>{stock ? stock + " - " + (stkQuote ? stkQuote.close : "Looking..") + 
                              (stkQuote ? " (" + stkQuote?.perchange?.toFixed(2) + "%)" : "..") : "Looking"}</>
    
    return (
      <Card style={cardStyle}>
          <CardHeader title={gettitle()}
                      subheader = {getsubheader()}
                      onClick={() => showPriceChart(stock)}
                      style={{cursor:"pointer"}}
          />
        <CardContent>
          <div style={{height:"90%"}}>
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
