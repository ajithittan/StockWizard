import { useEffect} from "react";
import {StockPriceV2} from '../modules/api/StockMaster'
import {useDispatch} from 'react-redux'
import {ADD_TO_QUOTES} from '../redux/reducers/streamingQuotesSlice'

const StockQuotesLatest = (props) =>{
    const dispatch = useDispatch()

    useEffect(() =>{
        if (props.stocks){
            getStkQuotes(props.stocks)
        }
    },[props.stocks])

    const getStkQuotes = async (stocks) => {
        StockPriceV2(stocks).then(res => {
            if (res && res.length > 0 ){
                dispatch(ADD_TO_QUOTES(res))
            }      
        })
    }

    return (
        <></>
  )
}

export default StockQuotesLatest