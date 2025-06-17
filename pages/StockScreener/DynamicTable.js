import React, { useState, useEffect } from 'react';

function DynamicTable({ jsonData, groupByColumn,actions }) {
  const [groupedData, setGroupedData] = useState({});

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

  const headerStyle = {
    border: '1px solid gray',
    textAlign: 'left',
    color:'blue',
    cursor:'pointer'
};

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
          //console.log("groupedgroupedgroupedgroupedgrouped",grouped)
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

  <div id="myFloatingDiv" style="display: none; position: absolute; top: 50px; left: 20px; background-color: white; border: 1px solid black; padding: 10px;">
  <ul>
    <li>Option 1</li>
    <li>Option 2</li>
    <li>Option 3</li>
  </ul>
  </div>

  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          <th style={headerStyle}>{groupByColumn}</th>
          {headers.filter(key => key !== groupByColumn).map(key => (
            <th style={headerStyle} key={key} onClick={() => changeGroupBy(key)}>{formatheader(key)}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Object.entries(groupedData).map(([group, items]) => (
          <React.Fragment key={group}>
            <tr>
              <td rowSpan={items.length + 1} style={cellStyle}>{group}</td>
            </tr>
            {items.map((item, index) => (
              <tr key={index}>
                {headers.filter(key => key !== groupByColumn).map(key => (
                    <td key={key} style={cellStyle}>{item[key] != null ? String(item[key]) : '-'}</td>
                ))}
              </tr>
            ))}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
}

export default DynamicTable;