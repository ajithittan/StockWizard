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
import Divider from '@mui/material/Divider';
import StockDetailCardHeader from './StockDetailCardHeader'

const StockDetailCard = (props,ref) => {
    const router = useRouter()
    const [stkQuote,setStkQuote] = useState(null)
    const [stock,setStock] = useState(null)
    const [type,setType] = useState("Basic")
    const [companySubHeader, setCompanySubHeader] = useState(null)
    const sm = useMediaQuery("(max-width: 960px)");
    const {dashboardsliderdur} = useSelector((state) => state.dashboardlayout)
    const [changeDur,setChangeDur] = useState(3)

    let cardStyle = {
        height:"90%",
        transitionDuration: '0.3s',
        transitionDuration: '0.3s',
        marginTop: sm ? "10px" : "15px",
        backgroundColor: stkQuote > 0 ? "#F5FEF8" :"#FFF8F9",
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

    const showPriceChart = (stk) => router.push({pathname: '/PriceCharts',query: {stock:stk,dur:dashboardsliderdur > 0 ? dashboardsliderdur : 3}})

    const getContent = () =>{
        let retVal = {
            "Basic":<CompanyStockPrice stock={stock} duration={changeDur} key={changeDur} ref={ref}></CompanyStockPrice>,
            "Companyinfo": <CompanyInformation stock={stock} setSubHeader={setCompanySubHeader}/> }
        return retVal[type]
    }

    const getsubheader = () => {
        let retVal = {
            "Basic": <><MovingAvg symbol = {props.stock} type={"SMA_50"}/>(50D)&nbsp;&nbsp;&nbsp;
                        <MovingAvg symbol = {props.stock} type={"SMA_200"}/>(200D)
                        </>,
            "Companyinfo": companySubHeader
        }
        return retVal[type]    
    }

    return (
      <Card style={cardStyle}>
        <CardHeader title={<StockDetailCardHeader key={stock} stock={stock} callBackForColor={setStkQuote}></StockDetailCardHeader>}
                      subheader = {getsubheader()}
                      onClick={() => showPriceChart(stock)}
                      style={{cursor:"pointer"}}
          />
        <CardContent>  
          <div style={{height:"90%"}}>
              {getContent()}
          </div>
          <Box display='flex' justifyContent='center'paddingTop={2}>
              <StockDetailCardOverlay type={type} callbackduration={setChangeDur}></StockDetailCardOverlay>
          </Box>
          <Divider></Divider>
          <Box display='flex' justifyContent='center' paddingBottom={2}>
              <StockDetailCardActions type={type} stock={stock} ontypechange={setType}></StockDetailCardActions>
          </Box>
        </CardContent>
      </Card>
    );
  }

export default forwardRef(StockDetailCard)
