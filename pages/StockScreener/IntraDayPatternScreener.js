import { useState,useEffect,useRef } from "react"
import Notification from './Notification';
import DynamicTableMini from './DynamicTableMini'
import DataGridViewComp from './DataGridViewComp'
import {useSelector,useDispatch} from 'react-redux'
import {CLICKED_ROW_DATA,ADD_STK_STREAM} from '../../redux/reducers/stockScreenerSlice'
//generalize this function.. can be done.

const IntraDayPatternScreener = (props) =>{
    const [showAll,setShowAll] = useState(false)
    const [columnsToShow,setColumnsToShow] = useState(["symbol","datetime","type","pattern_int_ema_co_13_48_5","pattern_int_sma_co_50_200","pattern_int_macd_cross_14","pattern_int_diadx_14",
                    "pattern_int_rsi_14","close","mcap"])
    const [style,setStyle] = useState({density:"compact",cntmobcols:6,cntcols:10})
    const dispatch = useDispatch()
    const [dtFrmStrm, setDtFrmStrm] = useState(null)
    const [newDtFrmStrm, setNewDtFrmStrm] = useState([])
    const [pointer,setPointer] = useState(0)
    const [showNotification, setShowNotification] = useState(false);
    const eventSourceRef = useRef(null);
    const [msgNotification,setMsgNotification] = useState(null)
    const [grpByCol,setGrpByCol] = useState("symbol")
    const {rowcount} = useSelector(state => state.stockscreener)
    const {dispsettings} = useSelector(state => state.stockscreener)
    
    
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

    //fix the below stream, this cannot work effectively like...
    useEffect(() =>{
            //close the stream and reset the data...will run into some race condition in future :)
            if (eventSourceRef.current) {
              setDtFrmStrm(null)
              setNewDtFrmStrm([])
              eventSourceRef.current.close();
            }
            if (dispsettings?.showDataTp === "ALL"){
              eventSourceRef.current = new EventSource('/stream/allintradaystkptrns/' + rowcount + '/' + pointer)
            }else{
              eventSourceRef.current = new EventSource('/stream/priorityintradayptrns/' + rowcount + '/' + pointer)
            }
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
      },[rowcount,dispsettings?.showDataTp])

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
            let id = "STOCK_GRAPH_" + inpActions["value"]
            let data = {symbol:inpActions["value"],patterns:[],id:id}
            dispatch(CLICKED_ROW_DATA({id:id,type:"STOCK_GRAPH",data:data}))
            dispatch(ADD_STK_STREAM([inpActions["value"]]))
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
                  <>
                    <DataGridViewComp key={dtFrmStrm+grpByCol} jsonData={dtFrmStrm} groupByColumn={grpByCol} actions={reactToActions} columnsDisp={columnsToShow} style={style}></DataGridViewComp>
                    {showNotification && <Notification key={showNotification+msgNotification} message={msgNotification} onclickshow={appendNewUpdates} visible={showNotification}/>}
                  </> : 
                  <div>no data from backend yet....</div>
              }
              
            </>
          }
        </>
      )

}

export default IntraDayPatternScreener

