import React, { useEffect, useState } from "react";
import StockDetailCard from './StockDetailCard'
import Grid from '@mui/material/Grid';
import AddPositions from './AddPositions'
import {getStockDetailsForStks} from '../../modules/api/StockMaster'
import {StockPriceV2} from '../../modules/api/StockMaster'
import StreamStockPrice from '../../components/StreamStockPrice'

const index = (props) =>{

    const [stocks,setStocks] = useState(null)
    const [stkQuotes,setStkQuote] = useState(null)
    const [stkStreamedQuotes,setStkStreamedQuotes] = useState(null)

    useEffect(() =>{
        if (props.stocks){
            setStocks(props.stocks)
            setTimeout(() => getStkQuotes(props.stocks),1000) 
        }
    },[props.stocks])

    useEffect(() =>{
        if(stkQuotes){
            setStocks([...stkQuotes.map(item => item.symbol)])
        }
    },[stkQuotes])

    const removeFromList = (stkSym) => setStocks([...stocks.filter(stk => stk !==stkSym)])

    const addToList = (stkSym) => props.actionAdd(stkSym)

    const getStkQuotes = async (stock) => {
        let res = await StockPriceV2(stock)
        if (res && res.length > 0 ){
            setStkQuote(res)
        }  
    }

    let counter = 0

    const streamedQuotes = async (quotes) => {
        quotes? setStkStreamedQuotes(quotes) : null
        counter++
        counter/5 === 0 ? setStkQuote(quotes) : null
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
            stocks?.map(item => <StockDetailCard key={item} stock={item} 
                                   stockQuote={stkQuotes?.filter(dtls => dtls.symbol === item)[0]} remove={removeFromList}
                                   streamedQuotes={stkStreamedQuotes?.filter(dtls => dtls.symbol === item)[0]}>
                                </StockDetailCard>) 
        }
        <AddPositions actionAdd={addToList}></AddPositions>
        <StreamStockPrice add={streamedQuotes} stocks={stocks}></StreamStockPrice>
      </Grid>
  )
}

export default index

