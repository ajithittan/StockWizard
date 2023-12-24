import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import { useEffect, useState,forwardRef } from "react"
import useMediaQuery from '@mui/material/useMediaQuery';
import CardHeader from '@mui/material/CardHeader'
import CompanyStockPrice from './CompanyStockPrice'
import MovingAvg from './MovingAvg'
import CompanyInformation from '../CompanyDetails/CompanyInformation'
import {useSelector} from 'react-redux'
import StockDetailCardActions from './StockDetailCardActions'
import StockDetailCardOverlay from './StockDetailCardOverlay'
import { useRouter } from 'next/router'

const StockDetailCard = (props,ref) => {
    const router = useRouter()
    const [stkQuote,setStkQuote] = useState(null)
    const [stock,setStock] = useState(null)
    const [type,setType] = useState("Basic")
    const [companySubHeader, setCompanySubHeader] = useState(null)
    const sm = useMediaQuery("(max-width: 960px)");
    const {dashboardsliderdur} = useSelector((state) => state.dashboardlayout)
    const [changeDur,setChangeDur] = useState(3)
    const [showOverLay,setShowOverlay] = useState(false)

    let cardStyle = {
        height:"90%",
        transitionDuration: '0.3s',
        transitionDuration: '0.3s',
        marginTop: sm ? "10px" : "15px",
        backgroundColor: stkQuote?.perchange?.toFixed(2) > 0 ? "#F5FEF8" :"#FFF8F9",
        color:'text.secondary',
        alignItems:"center",
    }

    useEffect(() =>{
        setChangeDur(dashboardsliderdur)
    },[dashboardsliderdur])

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

    const getContent = () =>{
        let queryparams = {}
        queryparams.stock = stock
        queryparams.duration = changeDur > 0 ? changeDur : 3
        let retVal = {
            "Basic":<CompanyStockPrice inpvals={queryparams} key={changeDur} ref={ref}></CompanyStockPrice>,
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
      <Card style={cardStyle} onMouseLeave = {() => setShowOverlay(false)}>
        <CardHeader title={gettitle()}
                      subheader = {getsubheader()}
                      onClick={() => showPriceChart(stock)}
                      style={{cursor:"pointer"}}
          />
        <CardContent>
          <div style={{height:"90%"}} onMouseEnter={() => setShowOverlay(true)}>
              {getContent()}
          </div>
          <Box display='flex' justifyContent='center'paddingTop={2} paddingBottom={2}>
            {showOverLay ? <StockDetailCardOverlay type={type} callbackduration={setChangeDur}/> : <StockDetailCardActions type={type} stock={stock} ontypechange={setType}></StockDetailCardActions>}
          </Box>
        </CardContent>
      </Card>
    );
  }

export default forwardRef(StockDetailCard)
