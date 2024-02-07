import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { useEffect, useState } from "react"
import IconButton from '@mui/material/IconButton';
import ExpandIcon from '@mui/icons-material/Expand';
import useMediaQuery from '@mui/material/useMediaQuery';
import CardHeader from '@mui/material/CardHeader'
import StockPatterns from './StockPatterns'

const Sectors = (props) => {
    const [stkQuote,setStkQuote] = useState(null)
    const [stocks,setStocks] = useState(props.stocks)
    const [sector,setSector] = useState(props.sector)
    const [type,setType] = useState("Basic")
    const sm = useMediaQuery("(max-width: 960px)");

    let cardStyle = {
        height:"90%",
        transitionDuration: '0.3s',
        transitionDuration: '0.3s',
        marginTop: sm ? "10px" : "15px",
        backgroundColor: stkQuote?.perchange?.toFixed(2) > 0 ? "#F5FEF8" :"#FFF8F9",
        color:'text.secondary',
        alignItems:"center",
    }

    return (
      <>
      <Card style={cardStyle}>
          <CardHeader title={sector}/>
        <CardContent>
          <div style={{height:"90%"}}>
            {stocks?.map(stk => <StockPatterns stock={stk}></StockPatterns>)}
          </div>
          <CardActions>
                <IconButton aria-label="reset">
                    <ExpandIcon onClick={() => setType("Basic")} />
                </IconButton>
          </CardActions>
        </CardContent>
      </Card>
      </>
    );
  }

export default Sectors
