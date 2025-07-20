import { useState,useRef, useEffect } from 'react'
import getStockPerChange from '../../modules/cache/cacheperchange'
import ChartViewer from './ChartViewer'
import BottomNav from './BottomNav'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ChartEntry from './ChartEntry'
import { useRouter } from 'next/router'

const index = (props) =>{
    const [chartData,setChartData] = useState(null)
    const router = useRouter()
    const stock = router.query.stock
    const initDur = router.query.dur ? JSON.parse(router.query.dur) : 3
    const ref = useRef()
    const [applyChanges,setApplyChanges] = useState(null)
    const [duration,setDuration] = useState(null)

    useEffect(() =>{
        if(initDur && stock){
            getStkDataFromBackEnd(stock,initDur.val).then(retval => setChartData(retval))
        }
    },[initDur,stock])

    const getStkDataFromBackEnd = async (stkSym,dur) =>{
        const cacheKey = stkSym + "_" + dur + "_" + 1 + "_" + "M"   
        return getStockPerChange(cacheKey,{'stock':stkSym,'duration':dur,'rollup':1,'unit':"M",'byType':"C"})
    }

   return(
       <>
       <title>Price Charts</title>
        <Box ref={ref} sx={{ flexGrow: 1,paddingLeft:"30px",paddingTop:"10px",height:"95vh"}}>
            <Grid container direction="rows">
                <Grid item ref={ref}>
                    <ChartEntry stock={stock} chartdata={chartData} changes={applyChanges} ref={ref}/>
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
