import React, {useEffect} from 'react'

const StreamStockHistoryPrice = (props) => {
 
  useEffect(() =>{
    let eventSource = undefined
    if (props.stocks){
      eventSource = new EventSource('/stream/stockprice/' + props.stock)  
      eventSource.onmessage = e => {
          var stkprcdata = JSON.parse(e.data)
          stkprcdata ? props.add(stkprcdata) : null
      }
      eventSource.onerror = (e) => {
          console.log("StreamStockHistoryPrice - An error occurred while attempting to connect.",e);
      };   
    }
    return () => eventSource?.close()
  },[props.stock])

  return (
      <></>
  )
};

export default StreamStockHistoryPrice;
