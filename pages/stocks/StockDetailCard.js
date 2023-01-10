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
import useMediaQuery from '@mui/material/useMediaQuery';
import CompanyStockPrice from './CompanyStockPrice'

const StockDetailCard = (props) => {

    const [stkDetail,setStkDetail] = useState(null)
    const router = useRouter()

    const sm = useMediaQuery("(max-width: 960px)");

    useEffect(() =>{
        if (props.basedetails){
            setStkDetail(props.basedetails)
        }
    },[])

    let cardStyle = {
        display: 'block',
        height: sm ? "80%" : "350px",
        width: sm ? "80%" : "350px", 
        transitionDuration: '0.3s',
        margin: '5px',
        paddingLeft: sm ? "5%" : "1px",
        backgroundColor: stkDetail && stkDetail.perchange.toFixed(2) > 0 ? "#F5FEF8" :"#FFF8F9",
        color:'text.secondary',
        alignItems:"center",
        //border: stkDetail && stkDetail.perchange.toFixed(2) > 0 ? "1px solid green" : "1px solid red"
    }

    let cardOverLay ={
            position: 'relative',
            top: '20px',
            left: '20px',
            color: 'black',
            backgroundColor: 'white'
    }

    const showPriceChart = (stk) =>{
        router.push({pathname: '/PriceCharts',query: {stock:stk}})
    }

    const stopTrackingStk = () =>{
        props.remove(stkDetail.symbol)
        let res = DeleteStkFromPositions(stkDetail.symbol)
    }

    function intToString (value) {
        var suffixes = ["", "k", "m", "b","t"];
        var suffixNum = Math.floor((""+value).length/3);
        var shortValue = parseFloat((suffixNum != 0 ? (value / Math.pow(1000,suffixNum)) : value).toPrecision(2));
        if (shortValue % 1 != 0) {
            shortValue = shortValue.toFixed(1);
        }
        return shortValue+suffixes[suffixNum];
    }

    return (
      <Card style={cardStyle}>
        <CardContent>
          <Typography style={{cursor:"pointer"}} gutterBottom onClick={() => showPriceChart(stkDetail.symbol)}>
            {stkDetail ? stkDetail.symbol : "Looking"} - {stkDetail ? "$" + stkDetail.close : "Looking"} ({stkDetail ? stkDetail.perchange.toFixed(2) : "Looking"}%) ({stkDetail ? intToString(stkDetail.volume) : "Looking"})
          </Typography>
          <Typography sx={{ mb: 1.5 }} variant="body2">
              {
                  stkDetail ? <>
                                 <table>
                                     <tr >
                                        <td>Vol</td>
                                        <td>10D({intToString(stkDetail.avgdayvol10day)})</td>
                                        <td >3M({intToString(stkDetail.avgdayvol3mon)})</td>
                                     </tr>
                                 </table>
                               </> : null     
              }
          </Typography>
          <Typography sx={{ mb: 1.5 }} variant="body2">
              {
                  stkDetail ? <>
                                 <table>
                                     <tr >
                                        <td>SMA</td>
                                        <td>50D($<MovingAvg symbol = {stkDetail.symbol} type={"SMA_50"}/>)</td>
                                        <td >200D($<MovingAvg symbol = {stkDetail.symbol} type={"SMA_200"}/>)</td>                                     </tr>
                                 </table>
                               </> : null     
              }
          </Typography>
          {stkDetail ? <div style={{paddingLeft:"20px"}}><CompanyStockPrice stock={stkDetail.symbol} duration={3}></CompanyStockPrice> </div>: null}
          <CardActions>
                <IconButton aria-label="delete">
                    <DeleteIcon onClick={stopTrackingStk} />
                </IconButton>
          </CardActions>
        </CardContent>
      </Card>
    );
  }

export default StockDetailCard
