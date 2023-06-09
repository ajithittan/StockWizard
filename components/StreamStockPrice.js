import React, { useState,useEffect,useContext } from 'react'

const StreamStockPrice = (props) => {
  const [stocks,setStocks] = useState(null)
  //const [streamdata, setstreamdata] = useState(null);
  const [streamObj,setstreamObj] = useState(null)

  useEffect(() => {
    if(!streamObj) {
      starteventsource()
    }
  },[])

  useEffect(() =>{
    if(props.stocks){
      setStocks(props.stocks)
      starteventsource()
    }
  },[props.stocks])

  const starteventsource = () => {
    //console.log("starteventsource",stocks)
    if (stocks){
      var filteredArray = stocks
      console.log(JSON.stringify(filteredArray))
      const eventSource = new EventSource('/stream/stockprice?inpdata=' + JSON.stringify(filteredArray))  
      eventSource.onmessage = e => {
          var stkprcdata = JSON.parse(e.data)
          console.log("streamed data is",stkprcdata)
          //setstreamdata(stkprcdata)
          stkprcdata ? props.add(stkprcdata) : null
          //props.onChangeStmStkPrc(stkprcdata)
      }
      eventSource.onerror = (e) => {
          console.log("An error occurred while attempting to connect.",e);
      };    
    }
  }

  return (
      <></>
  )
};

export default StreamStockPrice;
