import { useState,useEffect } from "react"

//generalize this function.. can be done.

const IntraDayPatternScreener = () =>{
    const [dtFrmStrm, setDtFrmStrm] = useState(null)
    const [count,setCount] = useState(200)
    const [pointer,setPointer] = useState(0)

    useEffect(() =>{
        let eventSource = undefined
          eventSource = new EventSource('/stream/intradaystkptrns/' + count + '/' + pointer)  
          eventSource.onmessage = e => {
              console.log("e.datae.datae.data",JSON.parse(e.data))
              var stkprcdata = JSON.parse(e.data)
              stkprcdata ? setDtFrmStrm(stkprcdata) : null
          }
          eventSource.onerror = (e) => {
              console.log("IntraDayStockPatterns - An error occurred while attempting to connect.",e);
          };   
        return () => eventSource?.close()
      },[])

      const tableStyle = {
        borderCollapse: 'collapse',
        width: '100%',
        fontSize:16,
        fontFamily: "sans-serif"
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

      return (
        <>
          {
            dtFrmStrm ? <div>
                <JsonTable jsonData={dtFrmStrm} />
              </div> : 
              <div>no data from backend yet....</div>
          }
        </>
      )

}

export default IntraDayPatternScreener

