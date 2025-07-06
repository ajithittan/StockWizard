import { useState,useEffect,useRef } from "react"
import Notification from './Notification';
import DynamicTable from './DynamicTable'
import DynamicTableMini from './DynamicTableMini'
import {useSelector,useDispatch} from 'react-redux'
import {CLICKED_ROW_DATA,ADD_STK_STREAM} from '../../redux/reducers/stockScreenerSlice'
//generalize this function.. can be done.

const IntraDayPatternScreener = (props) =>{
    const dispatch = useDispatch()
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
          eventSourceRef.current = new EventSource('/stream/allintradaystkptrns/' + rowcount + '/' + pointer)  
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
        }else if (inpActions["action"] === "transitionact"){
          if (inpActions["value"][0] === "symbol"){
            const matchingKeys = Object.keys(inpActions["value"][1][0]).filter(key =>
              key.includes("pattern_int_")
            );
            let id = "STOCK_GRAPH_" + inpActions["value"][1][0]["symbol"] 
            let data = {symbol:inpActions["value"][1][0]["symbol"],patterns:matchingKeys,id:id}
            dispatch(CLICKED_ROW_DATA({id:id,type:"STOCK_GRAPH",data:data}))
            dispatch(ADD_STK_STREAM([inpActions["value"][1][0]["symbol"]]))
          }else{
            console.log("huh?",inpActions)
          }
        }else if (inpActions["action"] === "showAllPattrns"){
            dispatch(CLICKED_ROW_DATA({id:"INTRA_DAY",type:"INTRA_DAY",data:inpActions["value"]}))
         }
      }

      return (
        <>
          {
            props.mini ? <DynamicTableMini key={dtFrmStrm+grpByCol} jsonData={dtFrmStrm} actions={reactToActions}></DynamicTableMini> : 
            <>
              {
                dtFrmStrm ? 
                  <div>
                    <DynamicTable key={dtFrmStrm+grpByCol} jsonData={dtFrmStrm} groupByColumn={grpByCol} actions={reactToActions}></DynamicTable>
                    {showNotification && <Notification key={showNotification+msgNotification} message={msgNotification} onclickshow={appendNewUpdates} visible={showNotification}/>}
                  </div> : 
                  <div>no data from backend yet....</div>
              }
            </>
          }
        </>
      )

}

export default IntraDayPatternScreener

