import React, { useState,useEffect, use } from "react";
import { render } from "react-dom";
import { Rnd } from "react-rnd";
import BarChart from '../Charts/BarChart'

const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "solid 1px #ddd",
  background: "#f0f0f0",
  borderRadius:"5px"
};

const PriceActionScreener = () => {

  let [chartdata,setChartData] = useState(null)
  const [RND, SetRND] = useState({ width: 300, height: 300, x: 1, y: 10 });
  const margin = {top: 5, right: 5, bottom: 10, left: 15}

  useEffect(() =>{
    //get the data from backend....
    let retval = []
    for(let i=0; i < 5 ; i++){
        let tempData = {}
        tempData.xAxis = i
        tempData.yAxis = i*5 + 1
        retval.push(tempData)
    }
    setChartData(retval)  
  },[])  

  /***
  useEffect(() =>{
    if(chartdata){
        const timeOutId = setTimeout(() => {
            chartdata[4].yAxis = 10
            setChartData([...chartdata])
        },6000)
        return () => clearTimeout(timeOutId) 
    }
  },[chartdata])
 */

  const changePosition = (e, d) => {
    SetRND({ width: RND?.width, height: RND?.height, x: d.x, y: d.y });
  };

  const changeSize = (e, direction, ref, delta, position) => {
    SetRND({
      width: parseInt(ref.style.width.replace("px","")),
      height: parseInt(ref.style.height.replace("px","")),
      ...position
    });
  };    

  return (
    <Rnd
      style={style}
      size={{ width: RND.width, height: RND.height }}
      position={{ x: RND.x, y: RND.y }}
      onDragStop={changePosition}
      onResizeStop={changeSize}
    >
        <BarChart key={RND+chartdata} data={chartdata} dimensions={{width:RND?.width*0.85,height:RND?.height*0.85}} margin={margin}></BarChart>    
    </Rnd>
  );
}

export default PriceActionScreener
