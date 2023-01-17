import moment from 'moment';
import * as d3 from "d3";

const Line = (g,chardata,x,y) =>{
    //console.log("tooltip",tooltip)
    g.append("path")
      .datum(chardata)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
      .x(d => x(moment(d.date)))
      .y(d => y(d.close)))
}

const StraightXLine = (g,chardata,xScale,yScale,y,callback) =>{
  const minDt = moment(chardata[0].values.reduce((acc,item)=>{return acc&&new Date(acc)<new Date(item.date)?acc:item.date},'')).toDate()
  const maxDt = moment(chardata[0].values.reduce((acc,item)=>{return acc&&new Date(acc)>new Date(item.date)?acc:item.date},'')).toDate()

  g.append("line")
   .attr("class", "StraightXLine")
   .attr("x1", xScale(moment(minDt)))
   .attr("y1", yScale(y))
   .attr("x2", xScale(moment(maxDt)))
   .attr("y2", yScale(y))
   .style("cursor", "pointer") 

  g.append("text")
   .attr("x", xScale(moment(minDt)))
   .attr("class","StraightXLineLabel")
   .attr("id", "StraightXLineLabel")
   .attr("y", yScale(y))
   .text(y)   
  
  g.append("text")
   .attr("x", xScale(moment(maxDt)) + 10)
   .attr("class","StraightXLineLabel")
   .attr("id", "StraightXLineLabels")
   .attr("y", yScale(y))
   .text("X")
   .on("click", () => callback(y))  
   .style("cursor", "pointer")

   g.append("text")
   .attr("x", xScale(moment(minDt)) - 10)
   .attr("class","StraightXLineLabel")
   .attr("id", "StraightXLineLabels")
   .attr("y", yScale(y))
   .text("X")
   .on("click", () => callback(y))  
   .style("cursor", "pointer") 
}

export {Line,StraightXLine}