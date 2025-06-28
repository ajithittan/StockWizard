import { useEffect, useState,useRef,forwardRef } from "react"
import Grid from '@mui/material/Grid';
import ScreenerList from './ScreenerList'
import ChartEntry from '../PriceCharts/ChartEntry'

const MainScreenerContainer = () =>{
    const ref = useRef()
    const [lstOfItms, setLstOfItms] = useState(null)
    const [mainContainer,setMainContainer] = useState(null)
    const [restOfItems,setRestOfItems] = useState(null)
    
    useEffect(() =>{
        if(lstOfItms?.length){
            setMainContainer(lstOfItms[0])
            setRestOfItems([...lstOfItms.slice(1)])
        }
    },[lstOfItms])

    return (
        <div style={{marginLeft:"3vh",marginTop:"1vh"}}>  
            <ScreenerList onselect={setLstOfItms} ref={ref}></ScreenerList>
            <Grid container >
                {
                    mainContainer ? 
                        <Grid xs={11.9} sm={11.9} md={11.9} lg={11.9} xl={11.9} marginRight={0.3} 
                            sx={{overflow: 'auto'}}>
                                <div ref={ref} style={{width:"90%",height:"80vh" ,margin:"3vh"}}>
                                    {mainContainer}
                                </div>
                        </Grid>
                        :null
                }
                {
                    restOfItems?.map(item => (
                        <Grid xs={12} sm={12} md={2} lg={2} xl={2} marginRight={0.3} sx={{height:"30vh"}}>
                            {item}
                        </Grid>
                    ))
                }
            </Grid>
        </div>
    )

}

export default forwardRef(MainScreenerContainer)