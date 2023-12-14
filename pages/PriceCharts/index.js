import { useState } from 'react'
import ChartViewer from './ChartViewer'
import BottomNav from './BottomNav'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const index = (props) =>{

    const [applyChanges,setApplyChanges] = useState(null)

   return(
       <>
       <title>Price Charts</title>
        <Box sx={{ flexGrow: 1,paddingLeft:"30px",paddingTop:"10px" }}>
            <Grid container direction="rows">
                <Grid item >
                    <ChartViewer props={...props} changes={applyChanges}/>
                </Grid>
                <Grid item >
                    <BottomNav onChanges={setApplyChanges} adjSelections={setApplyChanges} stock={"AAPL"}></BottomNav>
                </Grid>
            </Grid>
        </Box>
        </>
    )
}

export default index
