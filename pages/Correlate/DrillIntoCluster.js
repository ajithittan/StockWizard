import { useEffect, useState,useRef,forwardRef } from 'react'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import CancelIcon from '@mui/icons-material/Cancel';
import Typography from '@mui/material/Typography';
import { pink } from '@mui/material/colors';
import DrillChartContainer from './DrillChartContainer'

const DrillIntoCluster = (props) =>{

    const [stocks,setStocks] = useState(null)
    const [streamChartData,setStreamChartData] = useState([])
    const [size,setSize] = useState(null)
    const ref = useRef()

    useEffect(() =>{
        if(props.stocks){
            setStocks(props.stocks.map(item => item.stock))
        }
    },[props.stocks])

    useEffect(() =>{
        if (ref){
            let tempsize = {}
            tempsize.w = ref?.current?.offsetWidth 
            tempsize.h = ref?.current?.offsetHeight 
            setSize(tempsize)
        }
    },[ref])

    const closeSelected = () => props.close(null)

    return(
        <Grid container layout={'column'}>
            <Grid item xs={11.5} sm={11.5} md={11.5} lg={11.5} xl={11.5}>
                    <Paper 
                        elevation={0} sx={{height: "75vh", width:"100%" ,display:"inline-block"
                        ,scrollbarWidth: "none", // Hide the scrollbar for firefox
                            '&::-webkit-scrollbar': {
                                display: 'none', // Hide the scrollbar for WebKit browsers (Chrome, Safari, Edge, etc.)
                            },}} ref={ref}>
                        <DrillChartContainer key={stocks} stocks={stocks} />
                    </Paper>
            </Grid>
            <Grid item xs={0.2} sm={0.2} md={0.2} lg={0.2} xl={0.2}>
                <a href="#"><CancelIcon sx={{ color: pink[500] }} onClick={() => closeSelected() }/></a>
            </Grid>
    </Grid> 
    )
}

export default DrillIntoCluster
