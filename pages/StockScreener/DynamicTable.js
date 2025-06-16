import React, { useState, useEffect } from 'react';

function DynamicTable({ jsonData, groupByColumn }) {
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


  if(!jsonData || jsonData.length === 0){
      return <p>No data available.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>{groupByColumn}</th>
          {Object.keys(jsonData[0]).filter(key => key !== groupByColumn).map(key => (
            <th key={key}>{key}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Object.entries(groupedData).map(([group, items]) => (
          <React.Fragment key={group}>
            <tr>
              <td rowSpan={items.length + 1}>{group}</td>
            </tr>
            {items.map((item, index) => (
              <tr key={index}>
                {Object.keys(item)
                  .filter(key => key !== groupByColumn)
                  .map(key => (
                    <td key={key}>{item[key]}</td>
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