import React, {useEffect} from 'react'

const StreamStockPrice = (props) => {
 
  useEffect(() =>{
    let eventSource = undefined
    if (props.stocks){
      var filteredArray = props.stocks
      eventSource = new EventSource('/stream/stockprice?inpdata=' + JSON.stringify(filteredArray))  
      eventSource.onmessage = e => {
          var stkprcdata = JSON.parse(e.data)
          stkprcdata ? props.add(stkprcdata) : null
      }
      eventSource.onerror = (e) => {
          console.log("An error occurred while attempting to connect.",e);
      };   
    }
    return () => eventSource?.close()
  },[props.stocks])

  return (
      <></>
  )
};

export default StreamStockPrice;
