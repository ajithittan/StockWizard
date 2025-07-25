import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import { useEffect, useState,forwardRef } from "react"
import useMediaQuery from '@mui/material/useMediaQuery';
import CardHeader from '@mui/material/CardHeader'
import MovingAvg from './MovingAvg'
import CompanyInformation from '../CompanyDetails/CompanyInformation'
import {useSelector,shallowEqual} from 'react-redux'
import StockDetailCardActions from './StockDetailCardActions'
import StockDetailCardOverlay from './StockDetailCardOverlay'
import { useRouter } from 'next/router'
import Divider from '@mui/material/Divider';
import StockDetailCardHeader from './StockDetailCardHeader'
import StockDetailCardPatterns from './StockDetailCardPatterns'
import StockDetailCardNews from './StockDetailCardNews'
import {getAlerts} from '../../redux/reducers/stockAlertsSlice'
import { useDispatch} from 'react-redux'
import ChartEntry from '../PriceCharts/ChartEntry'
import getStockPriceHist from '../../modules/cache/cacheprice'
import {getTickDataIntraDay} from '../../modules/api/StockMaster'
import StockCardStreamer from './StockCardStreamer'
import DynamicChartNotification from './DynamicChartNotification'

const StockDetailCard = (props,ref) => {
    const [chartData,setChartData] = useState(null)
    const [chartNotify,setChartNotify] = useState(null)
    const dispatch = useDispatch()
    const router = useRouter()
    const [stock,setStock] = useState(null)
    const [type,setType] = useState("Basic")
    const [companySubHeader, setCompanySubHeader] = useState(null)
    const sm = useMediaQuery("(max-width: 960px)");
    const {dashboardsliderdur} = useSelector((state) => state.dashboardlayout)
    const {dashboardoptions} = useSelector((state) => state.dashboardlayout)
    const [changeDur,setChangeDur] = useState(null)

    const stkQuote = useSelector(state => state.streamingquotes?.streamdata?.find(m=> {
        return m.symbol === props.stock
    }), shallowEqual)

    let cardStyle = {
        height:"95%",
        transitionDuration: '0.3s',
        transitionDuration: '0.3s',
        //marginTop: sm ? "10px" : "15px",
        backgroundColor: stkQuote?.perchange > 0 ? "#F5FEF8" :"#FFF8F9",
        color:'text.secondary',
        alignItems:"center",
    }

    useEffect(() =>{
        if (changeDur){
            getChartData(props.stock,changeDur.val,changeDur.type)
        }
    },[changeDur])

    useEffect(() =>{
        if (props.stock && dashboardsliderdur && dashboardsliderdur.val > 0){
            //setChangeDur(dashboardsliderdur.val)
            getChartData(props.stock,dashboardsliderdur.val,dashboardsliderdur.type)
        }
    },[dashboardsliderdur,props.stock])

    useEffect(() => {
        if(props.stock){
            setStock(props.stock)
            dispatch(getAlerts(props.stock))
        }
    },[props.stock])

    const showPriceChart = (stk) => router.push({pathname: '/PriceCharts',query: {stock:stk,dur: changeDur ? JSON.stringify(changeDur) : JSON.stringify(dashboardsliderdur)}})

    const getChartData = async (stock,duration,type) =>{
        if (type === "M"){
            let cacheKey = stock + "_" + duration + "_PRICE"
            getStockPriceHist(cacheKey,{stock:stock,duration:duration}).then(
                res => res?.length ? setChartData(res) : null
            )
        }else if (type === "D"){
            getTickDataIntraDay(stock,1).then(retval => setChartData(retval))
        }
    }

    const notifyOnChart = (inpmsg) => setChartNotify(inpmsg.msg)

    const getContent = () =>{
        let retVal = {
            "Basic":<><ChartEntry stock={stock} chartdata={chartData} key={chartData} ref={ref}></ChartEntry>< StockCardStreamer stock={stock} callBackFunction={notifyOnChart}/></>,
            "Companyinfo": <CompanyInformation stock={stock} setSubHeader={setCompanySubHeader}/>,
            "StkPtrns": <StockDetailCardPatterns stock={stock} setSubHeader={setCompanySubHeader}/>,
            "StkNews": <StockDetailCardNews stock={stock} setSubHeader={setCompanySubHeader}/>  
        }
        return retVal[type]
    }

    const getsubheader = () => {
        let retVal = {
            "basic": <><MovingAvg symbol = {props.stock} type={"SMA_50"}/>(50D)&nbsp;&nbsp;&nbsp;
                        <MovingAvg symbol = {props.stock} type={"SMA_200"}/>(200D)
                        </>,
            "Companyinfo": companySubHeader,
            "notification": <DynamicChartNotification key={chartNotify} notification={chartNotify}></DynamicChartNotification>
        }
        return retVal[dashboardoptions?.subheader]    
    }

    return (
      <Card style={cardStyle}>
        <CardHeader title={<StockDetailCardHeader stock={stock}></StockDetailCardHeader>}
                      subheader = {getsubheader()}
                      onClick={() => showPriceChart(stock)}
                      style={{cursor:"pointer"}}
          />
        <CardContent>  
          <div style={{height:"90%"}}>
              {getContent()}
          </div>
          <Box display='flex' justifyContent='center'paddingTop={2} sx={{display: dashboardoptions?.showcarddetail? null : "none"}}>
              <StockDetailCardOverlay type={type} callbackduration={setChangeDur}></StockDetailCardOverlay>
          </Box>
          {dashboardoptions?.showcarddetail && dashboardoptions?.showcardactions? <Divider></Divider> : null}
          <Box display='flex' justifyContent='center' paddingTop={2} sx={{display: dashboardoptions?.showcardactions? null : "none"}}>
              <StockDetailCardActions type={type} stock={stock} ontypechange={setType} openinfull={() => props.openinModal(props.stock)}></StockDetailCardActions>
          </Box>
        </CardContent>
      </Card>
    );
  }

export default forwardRef(StockDetailCard)
