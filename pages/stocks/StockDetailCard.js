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

const StockDetailCard = (props,ref) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const [stock,setStock] = useState(null)
    const [type,setType] = useState("Basic")
    const [companySubHeader, setCompanySubHeader] = useState(null)
    const sm = useMediaQuery("(max-width: 960px)");
    const {dashboardsliderdur} = useSelector((state) => state.dashboardlayout)
    const [changeDur,setChangeDur] = useState(3)

    const stkQuote = useSelector(state => state.streamingquotes?.streamdata?.find(m=> {
        return m.symbol === props.stock
    }), shallowEqual)

    let cardStyle = {
        height:"95%",
        transitionDuration: '0.3s',
        transitionDuration: '0.3s',
        marginTop: sm ? "10px" : "15px",
        backgroundColor: stkQuote?.perchange > 0 ? "#F5FEF8" :"#FFF8F9",
        color:'text.secondary',
        alignItems:"center",
    }

    useEffect(() =>{
        if (dashboardsliderdur > 0){
            setChangeDur(dashboardsliderdur)
        }
    },[dashboardsliderdur])

    useEffect(() => {
        if(props.stock){
            setStock(props.stock)
            dispatch(getAlerts(props.stock))
        }
    },[props.stock])

    const showPriceChart = (stk) => router.push({pathname: '/PriceCharts',query: {stock:stk,dur:changeDur || dashboardsliderdur || 3}})

    const getContent = () =>{
        let retVal = {
            "Basic":<ChartEntry stock={stock} duration={changeDur} key={changeDur} ref={ref}></ChartEntry>,
            "Companyinfo": <CompanyInformation stock={stock} setSubHeader={setCompanySubHeader}/>,
            "StkPtrns": <StockDetailCardPatterns stock={stock} setSubHeader={setCompanySubHeader}/>,
            "StkNews": <StockDetailCardNews stock={stock} setSubHeader={setCompanySubHeader}/>  
        }
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
        <CardHeader title={<StockDetailCardHeader stock={stock}></StockDetailCardHeader>}
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
          <Box display='flex' justifyContent='center' paddingTop={2}>
              <StockDetailCardActions type={type} stock={stock} ontypechange={setType} openinfull={() => props.openinModal(props.stock)}></StockDetailCardActions>
          </Box>
        </CardContent>
      </Card>
    );
  }

export default forwardRef(StockDetailCard)
