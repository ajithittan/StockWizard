import {useState } from "react"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import useMediaQuery from '@mui/material/useMediaQuery';
import CardHeader from '@mui/material/CardHeader'
import StockPatterns from './StockPatterns'

const Sectors = (props) => {
    const [stocks,setStocks] = useState(props.stocks)
    let [counts,setCounts] = useState(0)
    const [sector,setSector] = useState(props.sector)
    const [orderedStk,setOrderedStks] = useState(null)
    const sm = useMediaQuery("(max-width: 960px)");
    const [show,setShow] = useState(false)

    let cardStyle = {
        height:show ? "100%" : "70px",
        transitionDuration: '0.3s',
        transitionDuration: '0.3s',
        marginTop: sm ? "10px" : "15px",
        backgroundColor: "#F5FEF8",
        color:'text.secondary',
        alignItems:"center",
        marginBottom: show ? "50px" :"1px",
    }

    const updCount = () =>{
      counts = counts + 1
      setCounts(counts)
    }

    const showHideToggle = () => show ? setShow(false) : setShow(true)

    return (
        <>
          <Card style={cardStyle}>
              <CardHeader sx={{cursor:"pointer"}} title={sector + "(" + counts + "/" + stocks?.length +  ")"} onClick={showHideToggle}/>
            <CardContent>
              <div style={{height:show ? "92%" : "10%"}}>
                {stocks?.map((stk,idx) => <StockPatterns stock={stk} onupdCnt={updCount} expand={show} textcolor={true}></StockPatterns>)}
              </div>
            </CardContent>
          </Card>
        </>
    );
}

export default Sectors
