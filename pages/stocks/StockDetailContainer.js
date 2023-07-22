import React, { useEffect, useState } from "react";
import StockDetailCard from './StockDetailCard'
import Grid from '@mui/material/Grid';
import AddPositions from './AddPositions'
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
        StockPriceV2(stock).then(res => {
            if (res && res.length > 0 ){
                setStkQuote(res)
            }      
        })
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
            align="stretch"
            marginTop={1}
            marginLeft={2}
        >
        {
            stocks?.map(item => <Grid xs={10} sm={10} md={6} lg={4} xl={3}><StockDetailCard key={item} stock={item} 
                                   stockQuote={stkQuotes?.filter(dtls => dtls.symbol === item)[0]} remove={removeFromList}
                                   streamedQuotes={stkStreamedQuotes?.filter(dtls => dtls.symbol === item)[0]}>
                                </StockDetailCard></Grid>) 
        }
        <AddPositions actionAdd={addToList} initialSetOfStocks={stocks}></AddPositions>
        <StreamStockPrice add={streamedQuotes} stocks={stocks}></StreamStockPrice>
      </Grid>
  )
}

export default index

