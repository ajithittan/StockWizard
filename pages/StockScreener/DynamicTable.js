import React, { useState, useEffect } from 'react';

function DynamicTable({ jsonData, groupByColumn,actions }) {
  const [groupedData, setGroupedData] = useState({});
  const groupBy = (data, key) => {
    return data.reduce((acc, item) => {
      const group = item[key];
      acc[group] = acc[group] || [];
      acc[group].push(item);
      return acc;
    }, {});
  };

  useEffect(() => {
      if(jsonData && jsonData.length > 0){

          const grouped = groupBy(jsonData, groupByColumn);
          setGroupedData(grouped);
      }
  }, [jsonData, groupByColumn]);

  // 1. Extract Unique Headers
  const headers = Array.from(
  new Set(jsonData?.flatMap((obj) => Object.keys(obj)))
  );

  if(!jsonData || jsonData.length === 0){
      return <p>No data available.</p>;
  }

  const formatheader = (inpval) => inpval.replace("pattern_int_","") 

  const changeGroupBy = (val) => {
    const actionval = {action:'chggroupby',value:val}
    actions(actionval)
  }

  return (
    <table className="styled-table">
      <thead>
        <tr>
          <th>{formatheader(groupByColumn)}</th>
          {headers.filter(key => key !== groupByColumn).map(key => (
            <th key={key} onClick={() => changeGroupBy(key)}>{formatheader(key)}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Object.entries(groupedData).filter(item => item[0] !== "undefined").map(([group, items]) => (
          <>
            <tr>
              <td rowSpan={items.length + 1}>{group}</td>
            </tr>
            {items.map((item, index) => (
              <tr key={index}>
                {headers.filter(key => key !== groupByColumn).map(key => (
                    <td key={key}>{item[key] != null ? String(item[key]) : '-'}</td>
                ))}
              </tr>
            ))}
          </>
        ))}
      </tbody>
    </table>
  );
}

export default DynamicTable;