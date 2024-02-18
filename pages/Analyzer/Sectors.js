import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {useState } from "react"
import useMediaQuery from '@mui/material/useMediaQuery';
import CardHeader from '@mui/material/CardHeader'
import StockPatterns from './StockPatterns'

const Sectors = (props) => {
    const [stocks,setStocks] = useState(props.stocks)
    let [counts,setCounts] = useState(0)
    const [sector,setSector] = useState(props.sector)
    const [orderedStk,setOrderedStks] = useState(null)
    const sm = useMediaQuery("(max-width: 960px)");

    let cardStyle = {
        height:"100%",
        transitionDuration: '0.3s',
        transitionDuration: '0.3s',
        marginTop: sm ? "10px" : "15px",
        backgroundColor: "#F5FEF8",
        color:'text.secondary',
        alignItems:"center",
        marginBottom:"50px",
    }

    const updCount = () =>{
      counts = counts + 1
      setCounts(counts)
    }

    return (
        <>
          <Card style={cardStyle}>
              <CardHeader title={sector + "(" + counts + "/" + stocks.length +  ")"}/>
            <CardContent>
              <div style={{height:"92%"}}>
                {stocks?.map((stk,idx) => <StockPatterns stock={stk} onupdCnt={updCount}></StockPatterns>)}
              </div>
            </CardContent>
          </Card>
        </>
    );
}

export default Sectors
