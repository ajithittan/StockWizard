import moment from 'moment';
import * as d3 from "d3";

const Line = (g,chardata,x,y,color,animate,id) =>{
    let strk_wid = color === "#1E90FF" ? 0.9 : 0.5
    let opacity = color === "#1E90FF" ? 0.9 : 0.5
    g.append("path")
      .attr("class", "line")
      .attr("id", "id_"+id?.toString())
      .datum(chardata)
      .attr("fill", "none")
      .attr("stroke", color ? color : "#1E90FF")
      .attr("stroke-width", strk_wid)
      .attr("stroke-opacity", opacity)
      .attr("d", d3.line()
      .x(d => x(moment(d.date)))
      .y(d => y(d.close)))
      .transition()
      .duration(animate?200:50)
}

const StraightXLine =(g,chardata,xScale,yScale,inpVals,callback) => {
  let textToDisplay = inpVals.close + (inpVals.position ? "(" + inpVals.position + ")" : "")
  const minDt = moment(chardata[0].values.reduce((acc,item)=>{return acc&&new Date(acc)<new Date(item.date)?acc:item.date},'')).toDate()
  const maxDt = moment(chardata[0].values.reduce((acc,item)=>{return acc&&new Date(acc)>new Date(item.date)?acc:item.date},'')).toDate()

  g.append("line")
   .attr("class", "StraightXLine")
   .attr("x1", xScale(moment(minDt)))
   .attr("y1", yScale(inpVals.close))
   .attr("x2", xScale(moment(maxDt)))
   .attr("y2", yScale(inpVals.close))
   .style("cursor", "pointer") 

  g.append("text")
   .attr("x", xScale(moment(minDt)))
   .attr("class","StraightXLineLabel")
   .attr("id", "StraightXLineLabel")
   .attr("y", yScale(inpVals.close))
   .text(textToDisplay)   
  
  g.append("text")
   .attr("x", xScale(moment(maxDt)) + 10)
   .attr("class","StraightXLineLabel")
   .attr("id", "StraightXLineLabels")
   .attr("y", yScale(inpVals.close))
   .text("X")
   .on("click", () => callback(inpVals))  
   .style("cursor", "pointer")

   g.append("text")
   .attr("x", xScale(moment(minDt)) - 10)
   .attr("class","StraightXLineLabel")
   .attr("id", "StraightXLineLabels")
   .attr("y", yScale(inpVals.close))
   .text("X")
   .on("click", () => callback(inpVals))  
   .style("cursor", "pointer") 
}

const Linev2 = (g,chardata,x,y,color,animate,id,xfield,yfield) =>{
  let strk_wid = color === "#1E90FF" ? 0.9 : 0.5
  let opacity = color === "#1E90FF" ? 0.9 : 0.5
  g.append("path")
    .attr("class", "line")
    .datum(chardata)
    .attr("fill", "none")
    .attr("id", "ln_" + id?.toString())
    .attr("stroke", color ? color : "#1E90FF")
    .attr("stroke-width", strk_wid)
    .attr("stroke-opacity", opacity)
    .attr("d", d3.line()
    .x(d => x(d[xfield]))
    .y(d => y(d[yfield])))
    .transition()
    .duration(animate?200:50)

  g.append("text")
   .attr("x", x(chardata[0][xfield]))
   .style('fill', color)
   .attr("id", "ln_t_"+ id?.toString())
   .attr("y", y(chardata[0][yfield]))
   .text(id)   
   //.on("click", () => callback(inpVals))  
   .style("cursor", "pointer")    
}


export {Line,Linev2,StraightXLine}