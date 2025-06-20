import { useState } from "react"
import Grid from '@mui/material/Grid';
import IntraDayPatternScreener from './IntraDayPatternScreener'
import ScreenerList from './ScreenerList'

const MainScreenerContainer = () =>{

    const [lstOfItms, setLstOfItms] = useState(null)

    return (
        <div style={{marginLeft:"3vh",marginTop:"1vh"}}>  
            <ScreenerList onselect={setLstOfItms}></ScreenerList>
            <Grid container >
                {
                    lstOfItms ? lstOfItms.map(item => 
                        <Grid 
                        style={{
                            minHeight: '35vh'
                        }} xs={12} sm={12} md={3} lg={3} xl={3} marginRight={0.3}>
                            <IntraDayPatternScreener></IntraDayPatternScreener>
                        </Grid>                               
                    ):null
                }
            </Grid>
        </div>
    )

}

export default MainScreenerContainer