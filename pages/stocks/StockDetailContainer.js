import React, { useEffect, useState } from "react";
import StockDetailCard from './StockDetailCard'
import Grid from '@mui/material/Grid';
import AddPositions from './AddPositions'
import {getStockDetailsForStks} from '../../modules/api/StockMaster'

const index = (props) =>{

    const [stockDetails,setstockDetails] = useState([])

    useEffect(() =>{
        if (props.stockdetails){
            createStockDetails(props.stockdetails)
        }
    },[])

    const removeFromList = (stkSym) => {
        setstockDetails([...stockDetails.filter(item => item !== stkSym)])
    }


    const createStockDetails = async (listStks) =>{

        if (listStks && listStks.length > 0){

            for (let i=0;i<listStks.length;i++){
                getStockDetailsForStks(listStks[i]).then(item => {
                    let tempCard = <StockDetailCard key={item[0].perchange.toFixed(2)} 
                                            stockdetails={item[0]} remove={removeFromList}/>
                    stockDetails.push(tempCard)
                    stockDetails.sort((a,b) => Math.abs(b.key) - Math.abs(a.key))
                    setstockDetails([...stockDetails])
                }).catch(err => console.log("ERROR - createStockDetailscard",err))
            }    
        }
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
            stockDetails ? stockDetails.map(item => item) : null
        }
        <AddPositions></AddPositions>
      </Grid>
  )
}

export default index

