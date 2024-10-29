import { useEffect, useState} from 'react'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import CancelIcon from '@mui/icons-material/Cancel';
import { pink } from '@mui/material/colors';
import DrillChartContainer from './DrillChartContainer'
import DrillIntoController from './DrillIntoController'

const DrillIntoCluster = (props) =>{

    const [stocks,setStocks] = useState(null)

    useEffect(() =>{
        if(props.stocks){
            setStocks(props.stocks.map(item => item.stock))
        }
    },[props.stocks])

    const closeSelected = () => props.close(null)

    return(
        <Grid container layout={'column'}>
            <Grid item xs={11.5} sm={11.5} md={11.5} lg={11.5} xl={11.5} marginLeft={3}>
                        <Paper 
                            elevation={0} sx={{height: "10vh",overflow:"scroll" 
                            ,scrollbarWidth: "none", // Hide the scrollbar for firefox
                                '&::-webkit-scrollbar': {
                                    display: 'none', // Hide the scrollbar for WebKit browsers (Chrome, Safari, Edge, etc.)
                                },}}>
                        <DrillIntoController key={stocks} stocks={stocks} margin={0.1}></DrillIntoController>
                    </Paper>
            </Grid>
            <Grid item xs={11.5} sm={11.5} md={11.5} lg={11.5} xl={11.5}>
                    <Paper 
                        elevation={0} sx={{height: "75vh", width:"100%" ,display:"inline-block"
                        ,scrollbarWidth: "none", // Hide the scrollbar for firefox
                            '&::-webkit-scrollbar': {
                                display: 'none', // Hide the scrollbar for WebKit browsers (Chrome, Safari, Edge, etc.)
                            },}}>
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
