import { useState,useRef, useEffect } from 'react'
import ChartViewer from './ChartViewer'
import BottomNav from './BottomNav'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ChartEntry from './ChartEntry'
import { useRouter } from 'next/router'

const index = (props) =>{
    const router = useRouter()
    const stock = router.query.stock
    const initDur = router.query.dur
    const ref = useRef()
    const [applyChanges,setApplyChanges] = useState(null)
    const [duration,setDuration] = useState(null)

    useEffect(() =>{
        setDuration(initDur)
    },[initDur])

   return(
       <>
       <title>Price Charts</title>
        <Box ref={ref} sx={{ flexGrow: 1,paddingLeft:"30px",paddingTop:"10px",height:"95vh"}}>
            <Grid container direction="rows">
                <Grid item ref={ref}>
                    <ChartEntry key={duration} stock={stock} duration={duration} changes={applyChanges} ref={ref}/>
                </Grid>
                <Grid item sx={{paddingLeft:"30px"}}>
                    <BottomNav onChanges={setApplyChanges} adjSelections={setApplyChanges} stock={stock} onchangedur={setDuration}></BottomNav>
                </Grid>
            </Grid>
        </Box>
        </>
    )
}

export default index
