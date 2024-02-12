import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {useState } from "react"
import useMediaQuery from '@mui/material/useMediaQuery';
import CardHeader from '@mui/material/CardHeader'
import StockPatterns from './StockPatterns'

const Sectors = (props) => {
    const [stkQuote,setStkQuote] = useState(null)
    const [stocks,setStocks] = useState(props.stocks)
    const [sector,setSector] = useState(props.sector)
    const sm = useMediaQuery("(max-width: 960px)");

    let cardStyle = {
        height:"95%",
        transitionDuration: '0.3s',
        transitionDuration: '0.3s',
        marginTop: sm ? "10px" : "15px",
        backgroundColor: stkQuote?.perchange?.toFixed(2) > 0 ? "#F5FEF8" :"#FFF8F9",
        color:'text.secondary',
        alignItems:"center",
        marginBottom:"50px",
    }
    
    return (
      <>
      <Card style={cardStyle}>
          <CardHeader title={sector}/>
        <CardContent>
          <div style={{height:"92%"}}>
            {stocks?.map((stk,idx) => <StockPatterns stock={stk}></StockPatterns>)}
          </div>
        </CardContent>
      </Card>
      </>
    );
  }

export default Sectors
