import { useEffect, useState } from 'react'
import StockInChip from '../stocks/StockInChip'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import Typography from '@mui/material/Typography';

const StackChipView = (props) => {
    const [inpData,setInpData] = useState(null)
    const [widthFactor,setWidthFactor] = useState(null)

    useEffect(() =>{
        setInpData(props.inputvals)
        if (props.inputvals[2]){
            setWidthFactor(1)
        }else{
            setWidthFactor(2)
        }
    },[props.inputvals])

    const selectCluster = (cluster) => props.onselect(inpData[cluster])

    return (
        <Grid container layout={'row'}>
            {
                inpData ? Object.keys(inpData).map(item => inpData[item].length > 10 ?
                        <Grid item xs={11.5} sm={11.5} md={5.5} lg={3*widthFactor} xl={3*widthFactor}>
                                <Paper component="fieldset"
                                    elevation={0} sx={{maxheight: "85vh",overflow:"scroll" 
                                    ,scrollbarWidth: "none", // Hide the scrollbar for firefox
                                        '&::-webkit-scrollbar': {
                                            display: 'none', // Hide the scrollbar for WebKit browsers (Chrome, Safari, Edge, etc.)
                                        },}}>
                                    <legend align="center">
                                        <a href="#" onClick={() =>selectCluster(item)}><Typography variant="overline">Cluster-{Number(item)+1}</Typography></a>&nbsp;
                                        <a href="#"><AutoGraphIcon onClick={() =>selectCluster(item)}/></a>
                                    </legend>
                                    {
                                            inpData[item].map(eachitem => <StockInChip details={eachitem} margin={0.2}/>)
                                    }
                                </Paper>

                        </Grid> : null 
                ) : null
            }  
        </Grid> 
    );
}

export default StackChipView