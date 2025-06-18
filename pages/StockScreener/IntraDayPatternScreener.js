import { useState,useEffect,useRef } from "react"
import Notification from './Notification';
import DynamicTable from './DynamicTable'
import {useSelector,useDispatch} from 'react-redux'
//generalize this function.. can be done.

const IntraDayPatternScreener = () =>{
    const [dtFrmStrm, setDtFrmStrm] = useState(null)
    const [newDtFrmStrm, setNewDtFrmStrm] = useState([])
    const [pointer,setPointer] = useState(0)
    const [showNotification, setShowNotification] = useState(false);
    const eventSourceRef = useRef(null);
    const [msgNotification,setMsgNotification] = useState(null)
    const [grpByCol,setGrpByCol] = useState("symbol")

    const {rowcount} = useSelector(state => state.stockscreener)

    useEffect(() =>{
      if (newDtFrmStrm && newDtFrmStrm.length > 0){
        if (!dtFrmStrm){
          setDtFrmStrm([...newDtFrmStrm])
        }
        else{
          setMsgNotification(newDtFrmStrm.length - dtFrmStrm.length)
          setShowNotification(true)
        }
      }
    },[newDtFrmStrm])

    const appendNewUpdates = () => setDtFrmStrm([...newDtFrmStrm])

    useEffect(() =>{
      setNewDtFrmStrm([])
      setDtFrmStrm(null)
    },[rowcount])

    useEffect(() =>{
          eventSourceRef.current = new EventSource('/stream/intradaystkptrns/' + rowcount + '/' + pointer)  
          eventSourceRef.current.onmessage = e => {
              //console.log("e.datae.datae.data",JSON.parse(e.data))
              var stkprcdata = JSON.parse(e.data)
              stkprcdata && stkprcdata.length > 0 ? setNewDtFrmStrm((newDtFrmStrm) => [...stkprcdata,...newDtFrmStrm]) : null
          }
          eventSourceRef.current.onerror = (e) => {
              console.log("IntraDayStockPatterns - An error occurred while attempting to connect.",e);
          };   
          return () => {
            if (eventSourceRef.current) {
              eventSourceRef.current.close();
            }
          };
      },[rowcount])

      const reactToActions = (inpActions) =>{
        if (inpActions["action"] === "chggroupby"){
          setGrpByCol(inpActions["value"])
        }
      }

      return (
        <>
          {
            dtFrmStrm ? <div>
                <DynamicTable key={dtFrmStrm+grpByCol} jsonData={dtFrmStrm} groupByColumn={grpByCol} actions={reactToActions}></DynamicTable>
                {showNotification && <Notification key={showNotification+msgNotification} message={msgNotification} onclickshow={appendNewUpdates} visible={showNotification}/>}
              </div> : 
              <div>no data from backend yet....</div>
          }
        </>
      )

}

export default IntraDayPatternScreener

