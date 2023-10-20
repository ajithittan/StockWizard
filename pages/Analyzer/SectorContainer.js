import React, { useEffect, useState } from "react";
import Sectors from './Sectors'
import Grid from '@mui/material/Grid';

const SectorContainer = (props) =>{

    const [sectors,setSectors] = useState(null)

    useEffect(() =>{
        if (!sectors){
            setSectors(["Consumer","Technology","Healthcare","Banking"])
        }
    },[])

    return (
        <Grid
            container
            direction="row"
            justify="space-evenly"
            align="stretch"
        >
        {

            sectors?.map(item => <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
                                    <Sectors key={item} sector={item}></Sectors>
                                </Grid>
                        ) 
        }
      </Grid>
  )
}

export default SectorContainer

