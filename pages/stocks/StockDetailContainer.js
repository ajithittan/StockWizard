import React, { useEffect, useState } from "react";
import StockDetailCard from './StockDetailCard'
import Grid from '@mui/material/Grid';
import AddPositions from './AddPositions'
import {getStockDetailsForStks} from '../../modules/api/StockMaster'
import {StockPriceV2} from '../../modules/api/StockMaster'

const index = (props) =>{

    const [stockDetails,setstockDetails] = useState(null)

    useEffect(() =>{
        if (props.stocks){
            createStockDetails(props.stocks)
            getStkQuotes(props.stocks)
        }
    },[props.stocks])

    const removeFromList = (stkSym) => {
        setstockDetails([...stockDetails.filter(item => item !== stkSym)])
    }

    const getStkQuotes = async (stock) =>{
        let res = await StockPriceV2(stock)
        console.log("getStkQuotes",res)
        if (res && res.length > 0 ){
            setStkQuote(res[0])
        }  
    }

    const createStockDetails = async (listStks) =>{

        //console.log("listStks",listStks)

        if (listStks && listStks.length > 0){
            let stkDetails = []
            for (let i=0;i<listStks.length;i++){
                getStockDetailsForStks(listStks[i]).then(item => {
                    let tempCard = {comp:<StockDetailCard key={item[0].symbol + item[0].perchange.toFixed(2)} 
                                            stockdetails={item[0]} remove={removeFromList}/>,val:item[0].perchange.toFixed(2)}
                    stkDetails.push(tempCard)
                    stkDetails.sort((a,b) => Math.abs(b.val) - Math.abs(a.val))
                    setstockDetails([...stkDetails.map(item => item.comp)])
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

