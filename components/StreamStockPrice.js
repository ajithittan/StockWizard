import React, {useEffect} from 'react'
import { useSelector, useDispatch} from 'react-redux'
import {ADD_TO_STREAMED_QUOTES} from '../redux/reducers/streamingQuotesSlice'

const StreamStockPrice = () => {

  const dispatch = useDispatch()
  const {dashboardstocks} = useSelector((state) => state.dashboardlayout)
  const streamedQuotes = async (quotes) => {
    if (quotes && quotes.length > 0){
      dispatch(ADD_TO_STREAMED_QUOTES(quotes))
    }
  }
 
  useEffect(() =>{
    let eventSource = undefined
    if (dashboardstocks){
      let filteredArray = dashboardstocks
      eventSource = new EventSource('/stream/stockprice?inpdata=' + JSON.stringify(filteredArray))  
      eventSource.onmessage = e => {
          var stkprcdata = JSON.parse(e.data)
          stkprcdata ? streamedQuotes(stkprcdata) : null
      }
      eventSource.onerror = (e) => {
          console.log("An error occurred while attempting to connect.",e);
      };   
    }
    return () => eventSource?.close()
  },[dashboardstocks])

  return (
      <></>
  )
};

export default StreamStockPrice;
