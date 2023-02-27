import React, { useEffect, useState } from "react";
import StockDetailCard from './StockDetailCard'
import Grid from '@mui/material/Grid';
import AddPositions from './AddPositions'

const index = (props) =>{

    const [stockDetails,setstockDetails] = useState(null)

    useEffect(() =>{
        if (props.stockdetails){
            setstockDetails([...props.stockdetails])
        }
    },[])

    const removeFromList = (stkSym) => {
        setstockDetails([...stockDetails.filter(item => item !== stkSym)])
    }

    return (
        <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="stretch"
            marginTop={2}
            marginLeft={2}
        >
        {
            stockDetails ? stockDetails.map(item => <StockDetailCard key={item} 
                                                     stock={item} remove={removeFromList}/>) 
                                    : null
        }
        <AddPositions></AddPositions>
      </Grid>
  )
}

export default index

