import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { useEffect, useState } from "react"
import { useRouter } from 'next/router'
import {DeleteStkFromPositions} from '../../modules/api/StockMaster'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import useMediaQuery from '@mui/material/useMediaQuery';
import CardHeader from '@mui/material/CardHeader'
import CompanyStockPrice from './CompanyStockPrice'
import MovingAvg from './MovingAvg'
import CompanyInformation from '../CompanyDetails/CompanyInformation'
import InfoIcon from '@mui/icons-material/Info';
import {useSelector} from 'react-redux'

const StockDetailCard = (props) => {
    const [stkQuote,setStkQuote] = useState(null)
    const [stock,setStock] = useState(null)
    const router = useRouter()
    const [type,setType] = useState("Basic")
    const [companySubHeader, setCompanySubHeader] = useState(null)
    const sm = useMediaQuery("(max-width: 960px)");
    const {dashboardsliderdur} = useSelector((state) => state.dashboardlayout)

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

    const showPriceChart = (stk) => router.push({pathname: '/PriceCharts',query: {stock:stk,dur:dashboardsliderdur > 0 ? dashboardsliderdur : 3}})
    
    const showAllCompanyStats = (stk) => router.push({pathname: '/CompanyDetails',query: {stock:stk,dur:3}})

    const stopTrackingStk = () =>{
        props.remove(stock)
        let res = DeleteStkFromPositions(stock)
    }

    const getContent = () =>{
        let retVal = {
            "Basic":<CompanyStockPrice stock={stock} duration={dashboardsliderdur > 0 ? dashboardsliderdur : 3} key={dashboardsliderdur}></CompanyStockPrice>,
            "Companyinfo": <CompanyInformation stock={stock} setSubHeader={setCompanySubHeader}/> }
        return retVal[type]
    }

    const getsubheader = () => {
        let retVal = {
            "Basic": <><MovingAvg symbol = {props.stock} type={"SMA_50"}/>(50D)&nbsp;&nbsp;&nbsp;
                        <MovingAvg symbol = {props.stock} type={"SMA_200"}/>(200D)</>,
            "Companyinfo": companySubHeader
        }
        return retVal[type]    
    }

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
                <IconButton aria-label="Information">
                    <InfoIcon onClick={() => setType("Companyinfo")} />
                </IconButton>
                <IconButton aria-label="delete">
                    <DeleteIcon onClick={stopTrackingStk} />
                </IconButton>
                <IconButton aria-label="More Information">
                    <ReadMoreIcon onClick={() => showAllCompanyStats(stock)} />
                </IconButton>
          </CardActions>
        </CardContent>
      </Card>
    );
  }

export default StockDetailCard
