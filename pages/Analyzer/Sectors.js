import {useState } from "react"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import useMediaQuery from '@mui/material/useMediaQuery';
import CardHeader from '@mui/material/CardHeader'
import StockPatterns from './StockPatterns'
import Box from '@mui/material/Box';

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
        backgroundColor: "#f9f9f7",
        color:'text.secondary',
        alignItems:"center",
        marginBottom: show ? "50px" :"1px",
        marginLeft:sm ? null : "5px",
        margin:"5px",
        marginRight:sm ? null : "15px"
    }

    const updCount = () =>{
      counts = counts + 1
      setCounts(counts)
    }

    const showHideToggle = () => show ? setShow(false) : setShow(true)

    return (
        <>
          <Card style={cardStyle}>
              <CardHeader titleTypographyProps={{variant:'subtitle1' }} sx={{cursor:"pointer",position:"sticky"}} title={sector + "(" + counts + "/" + stocks?.length +  ")"} onClick={showHideToggle}/>
            <CardContent>
              <Box style={{maxHeight: '100vh', overflow: 'auto'}}>
                {stocks?.map((stk,idx) => <StockPatterns stock={stk} onupdCnt={updCount} expand={show} textcolor={true}></StockPatterns>)}
              </Box>
            </CardContent>
          </Card>
        </>
    );
}

export default Sectors
