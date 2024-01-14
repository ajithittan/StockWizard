import moment from 'moment';

const StraightXLine =(g,chardata,xScale,yScale,inpVals,callback) => {
  let textToDisplay = inpVals.close + (inpVals.position ? "(" + inpVals.position + ")" : "")
  const minDt = moment(chardata.reduce((acc,item)=>{return acc&&new Date(acc)<new Date(item.date)?acc:item.date},'')).toDate()
  const maxDt = moment(chardata.reduce((acc,item)=>{return acc&&new Date(acc)>new Date(item.date)?acc:item.date},'')).toDate()

  g.append("line")
   .attr("class", "StraightXLine")
   .attr("id", "id_"+inpVals.id.toString())
   .attr("x1", xScale(moment(minDt)))
   .attr("y1", yScale(inpVals.close))
   .attr("x2", xScale(moment(maxDt)))
   .attr("y2", yScale(inpVals.close))
   .style("cursor", "pointer") 

  g.append("text")
   .attr("x", xScale(moment(minDt)))
   .attr("class","StraightXLineLabel")
   .attr("id", "id_"+inpVals.id.toString())
   .attr("y", yScale(inpVals.close))
   .text(textToDisplay)   
  
  g.append("text")
   .attr("x", xScale(moment(maxDt)) + 10)
   .attr("class","StraightXLineLabel")
   .attr("id", "id_"+inpVals.id.toString())
   .attr("y", yScale(inpVals.close))
   .text("X")
   .on("click", () => callback(inpVals))  
   .style("cursor", "pointer")

   g.append("text")
   .attr("x", xScale(moment(minDt)) - 10)
   .attr("class","StraightXLineLabel")
   .attr("id", "id_"+inpVals.id.toString())
   .attr("y", yScale(inpVals.close))
   .text("X")
   .on("click", () => callback(inpVals))  
   .style("cursor", "pointer") 
}

export {StraightXLine}