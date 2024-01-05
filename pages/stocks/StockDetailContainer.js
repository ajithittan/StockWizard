import { useEffect, useState,forwardRef,useRef } from "react";
import StockDetailCard from './StockDetailCard'
import Grid from '@mui/material/Grid';
import AddPositions from './AddPositions'
import {StockPriceV2} from '../../modules/api/StockMaster'
import { useSelector, useDispatch} from 'react-redux'
import {ADD_TO_QUOTES} from '../../redux/reducers/streamingQuotesSlice'

const index = (props) =>{
    const dispatch = useDispatch()
    const [stocks,setStocks] = useState(null)
    const [stkQuotes,setStkQuote] = useState(null)
    const {dashboardsector} = useSelector((state) => state.dashboardlayout)
    const ref = useRef()

    useEffect(() =>{
        if (props.stocks){
            //setStocks(props.stocks)
            //not sure why I did the below? puzzled....
            //setTimeout(() => getStkQuotes(props.stocks),1000) 
            getStkQuotes(props.stocks)
        }
    },[props.stocks])

    const removeFromList = (stkSym) => setStocks([...stocks.filter(stk => stk !==stkSym)])

    const getStkQuotes = async (stocks) => {
        StockPriceV2(stocks).then(res => {
            if (res && res.length > 0 ){
                setStocks([...res.map(item => item.symbol)])
                dispatch(ADD_TO_QUOTES(res))
            }      
        })
    }

    return (
        <Grid
            container
            direction="row"
            justify="space-evenly"
            align="stretch"
        >
        {

            stocks?.map(item => <Grid xs={12} sm={12} md={6} lg={3} xl={3} ref={ref}>
                                        <StockDetailCard ref={ref} key={item} stock={item} remove={removeFromList}>
                                        </StockDetailCard>
                                </Grid>) 
        }
        {dashboardsector ? null : <AddPositions initialSetOfStocks={stocks}></AddPositions>}
      </Grid>
  )
}

export default index