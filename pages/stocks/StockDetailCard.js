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
import {getStockDetailsForStks} from '../../modules/api/StockMaster'

const StockDetailCard = (props) => {

    const [stkDetail,setStkDetail] = useState(null)
    const router = useRouter()
    const [type,setType] = useState("Basic")

    const sm = useMediaQuery("(max-width: 960px)");

    useEffect(() =>{
        if (props.stock){
            getStkDetails(props.stock)
        }
    },[props.stock])

    const getStkDetails = async (stkList) =>{
        let res = await getStockDetailsForStks(stkList)
        if (res && res.length > 0 ){
            setStkDetail(res[0])
        }  
    }

    let cardStyle = {
        display: 'block',
        height: sm ? "90%" : "350px",
        width: sm ? "90%" : "400px", 
        transitionDuration: '0.3s',
        marginLeft: sm ? "10px" : "30px",
        marginTop: sm ? "10px" : "15px",
        paddingLeft: sm ? "5%" : "1px",
        backgroundColor: stkDetail && stkDetail.perchange.toFixed(2) > 0 ? "#F5FEF8" :"#FFF8F9",
        color:'text.secondary',
        alignItems:"center",
    }

    const showPriceChart = (stk) =>{
        router.push({pathname: '/PriceCharts',query: {stock:stk,dur:3}})
    }

    const stopTrackingStk = () =>{
        props.remove(stkDetail.symbol)
        let res = DeleteStkFromPositions(stkDetail.symbol)
    }

    const getContent = () =>{
        let retVal = {
            "Basic":<BasicContentStockDetail stkDetail={stkDetail}/>,
            "Earnings": <CompanyQtrPerf stock={stkDetail ? stkDetail.symbol : null}/> }
        return retVal[type]
    }

    return (
      <Card style={cardStyle}>
        <CardContent>
          <Typography style={{cursor:"pointer"}} gutterBottom onClick={() => showPriceChart(stkDetail.symbol)}>
            {stkDetail ? stkDetail.symbol : "Looking"} - {stkDetail ? "$" + stkDetail.close : "Looking"} ({stkDetail ? stkDetail.perchange.toFixed(2) : "Looking"}%) ({stkDetail ? intToString(stkDetail.volume) : "Looking"})
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
