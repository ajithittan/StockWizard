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
    const [count,setCount] = useState(2)
    const [size,setSize] = useState(null)
    const ref = useRef()

    useEffect(() =>{
        if(props.stocks){
            setStocks(props.stocks.map(item => item.stock))
        }
    },[props.stocks])

    useEffect(() =>{
        if (props.stocks){
            let eventSource = undefined
            eventSource = new EventSource('/stream/analyzecorrelations/' + count + '?inpdata=' + JSON.stringify(props.stocks.map(item => item.stock)))  
            eventSource.onmessage = e => {
                let stkcorrdata = JSON.parse(e.data)
                if (stkcorrdata && stkcorrdata.length > 0){
                    setStreamChartData(initialdata => [...stkcorrdata,...initialdata])
                }
            }
            eventSource.onerror = (e) => {
                console.log("An error occurred while attempting to connect.",e);
            };   
            return () => eventSource?.close()    
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
            <Grid item xs={11.8} sm={11.8} md={11.8} lg={11.8} xl={11.8}>
                    <Paper 
                        elevation={0} sx={{height: "75vh", width:"100%" ,display:"inline-block"
                        ,scrollbarWidth: "none", // Hide the scrollbar for firefox
                            '&::-webkit-scrollbar': {
                                display: 'none', // Hide the scrollbar for WebKit browsers (Chrome, Safari, Edge, etc.)
                            },}} ref={ref}>
                        <DrillChartContainer size={size} stocks={stocks} chartstream={streamChartData}/>
                    </Paper>
            </Grid>
            <Grid item xs={0.2} sm={0.2} md={0.2} lg={0.2} xl={0.2}>
                <a href="#"><CancelIcon sx={{ color: pink[500] }} onClick={() => closeSelected() }/></a>
            </Grid>
    </Grid> 
    )
}

export default DrillIntoCluster