import { useEffect, useState,useRef,forwardRef } from 'react'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import CancelIcon from '@mui/icons-material/Cancel';
import Typography from '@mui/material/Typography';
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
                    setStreamChartData(initialdata => [...initialdata,...stkcorrdata])
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
        <Grid container layout={'row'}>
        {
            
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Paper component="fieldset"
                        elevation={0} sx={{height: "80vh", width:"100%" ,overflow:"scroll" , display:"inline-block"
                        ,scrollbarWidth: "none", // Hide the scrollbar for firefox
                            '&::-webkit-scrollbar': {
                                display: 'none', // Hide the scrollbar for WebKit browsers (Chrome, Safari, Edge, etc.)
                            },}} ref={ref}>
                        <legend align="center">
                            <Typography variant="overline">Analyzing Cluster ...</Typography>&nbsp;
                            <a href="#"><CancelIcon onClick={() => closeSelected() }/></a>
                        </legend>
                        <DrillChartContainer size={size} stocks={stocks} chartstream={streamChartData}/>
                    </Paper>

            </Grid>
        }  
    </Grid> 
    )
}

export default DrillIntoCluster