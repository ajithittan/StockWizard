import { useEffect, useState,forwardRef,useRef } from "react";
import StockDetailCard from './StockDetailCard'
import Grid from '@mui/material/Grid';
import AddPositions from './AddPositions'
import {StockPriceV2} from '../../modules/api/StockMaster'
import { useSelector, useDispatch} from 'react-redux'
import {ADD_TO_QUOTES} from '../../redux/reducers/streamingQuotesSlice'
import {PriceChartWrapper} from '../../modules/state/ChartStateMgmt'

const index = (props) =>{
    const dispatch = useDispatch()
    const [stocks,setStocks] = useState(null)
    const [stkQuotes,setStkQuote] = useState(null)
    const {dashboardsector} = useSelector((state) => state.dashboardlayout)
    const ref = useRef()

    useEffect(() =>{
        if (props.stocks){
            setStocks(props.stocks)
            //not sure why I did the below? puzzled....
            //setTimeout(() => getStkQuotes(props.stocks),1000) 
            getStkQuotes(props.stocks)
        }
    },[props.stocks])

    useEffect(() =>{
        if(stkQuotes){
            setStocks([...stkQuotes.map(item => item.symbol)])
        }
    },[stkQuotes])

    const removeFromList = (stkSym) => setStocks([...stocks.filter(stk => stk !==stkSym)])

    const getStkQuotes = async (stock) => {
        StockPriceV2(stock).then(res => {
            if (res && res.length > 0 ){
                //setStkQuote(res)
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
                                    <PriceChartWrapper>
                                        <StockDetailCard ref={ref} key={item} stock={item} remove={removeFromList}>
                                        </StockDetailCard>
                                    </PriceChartWrapper>
                                </Grid>) 
        }
        {dashboardsector ? null : <AddPositions initialSetOfStocks={stocks}></AddPositions>}
      </Grid>
  )
}

export default index