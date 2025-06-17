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

      const tableStyle = {
        borderCollapse: 'collapse',
        width: '100%',
        fontSize:16,
        fontFamily: "sans-serif",
        height: '70vh'
      };

      const cellStyle = {
          border: '1px solid gray',
          textAlign: 'left',
      };

      function JsonTable({ jsonData }) {
        if (!jsonData || jsonData.length === 0) {
          return <p>No data to display.</p>;
        }
      
        // 1. Extract Unique Headers
        const headers = Array.from(
          new Set(jsonData.flatMap((obj) => Object.keys(obj)))
        );
      
        // 2. Map Data to Rows
        const rows = jsonData.map((obj, index) => (
          <tr key={index}>
            {headers.map((header, cellIndex) => (
              <td key={cellIndex} style={cellStyle}>{obj[header] != null ? String(obj[header]) : '-'}</td>
            ))}
          </tr>
        ));

        const formatheader = (inpval) => inpval.replace("pattern_int_","") 
      
        return (
          <table style={tableStyle}>
            <thead>
              <tr>
                {headers.map((header, index) => (
                  <th key={index} style={cellStyle}>{formatheader(header)}</th>
                ))}
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
        );
      }

      const reactToActions = (inpActions) =>{
        if (inpActions["action"] === "chggroupby"){
          setGrpByCol(inpActions["value"])
        }
      }

      return (
        <>
          {
            dtFrmStrm ? <div>
                {/**<JsonTable jsonData={dtFrmStrm} /> **/}
                <DynamicTable key={dtFrmStrm+grpByCol} jsonData={dtFrmStrm} groupByColumn={grpByCol} actions={reactToActions}></DynamicTable>
                {showNotification && <Notification key={showNotification+msgNotification} message={msgNotification} onclickshow={appendNewUpdates} visible={showNotification}/>}
              </div> : 
              <div>no data from backend yet....</div>
          }
        </>
      )

}

export default IntraDayPatternScreener

