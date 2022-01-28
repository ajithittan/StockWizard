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

export default Line