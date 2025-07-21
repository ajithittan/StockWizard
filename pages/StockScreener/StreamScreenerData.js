import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'

const StreamScreenerData = (props) => {

  const dispatch = useDispatch()

  const isValidJsonWithKeysOrArr = (data) => {
    // 1. Check if it's a non-null object
    if (typeof data !== 'object' || data === null) {
      return false;
    }
  
    // 2. Check if it's not an array
    if (Array.isArray(data) && data.length > 0) {
      return true;
    }
  
    // 3. Check if it has at least one key
    return Object.keys(data).length > 0;
  }

  const streamOutput = async (outputstream) => {
    if (isValidJsonWithKeysOrArr(outputstream)){
      //console.log("outputstreamoutputstreamoutputstreamoutputstream",outputstream)
      dispatch(props.streamout(outputstream))
    }
  }
  
  let eventSource = undefined

  useEffect(() =>{
    eventSource?.close()
  },[])

  useEffect(() =>{
    eventSource?.close()
    if (props.url && props.inpdata){
      //console.log("props.url, props.data",props.url , props.inpdata)
      eventSource = new EventSource(props.url)  
      eventSource.onmessage = e => {
          let retval = JSON.parse(e.data)
          console.log("retval",props.url,retval)
          retval ? streamOutput(retval) : null
      }
      eventSource.onerror = (e) => {
          console.log("An error occurred while attempting to connect in StreamScreenerData - ",e);
      };   
    }
    return () => eventSource?.close()
  },[props.url, props.inpdata])

  return (
      <></>
  )
};

export default StreamScreenerData;