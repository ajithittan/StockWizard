import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'

const StreamScreenerData = (props) => {

  const dispatch = useDispatch()

  const streamOutput = async (outputstream) => {
    if (outputstream && outputstream.length > 0){
      console.log("outputstream",outputstream)
      //dispatch(props.streamout(outputstream))
    }
  }
 
  useEffect(() =>{
    
    let eventSource = undefined
    if (props.url && props.inpdata){
      console.log("props.url, props.data",props.url , props.inpdata)
      eventSource = new EventSource(props.url)  
      eventSource.onmessage = e => {
          let retval = JSON.parse(e.data)
          console.log("e.datae.datae.datae.datae.data",e.data)
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