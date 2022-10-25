import moment from 'moment';
import * as d3 from "d3";

const MultiLine = (g,chardata,x,y) =>{

    g.selectAll(".line")
    .attr("class", "line")
    .data(chardata)
    .enter()
    .append("path")
    .attr("id", "multilines" )
    .attr("d", function (d) {
        return d3.line()
            .x(d => x(moment(d.date).toDate()))
            .y(d => y(d.close)).curve(d3.curveCardinal)
            (d.values)
    })
    .attr("fill", "none")
    .attr("stroke-width", (d,indx) => indx===0? 0.7 : 0.5)
    .attr("stroke", (d,indx) => indx===0? "blue" : "purple")
    .style("cursor", "pointer")

}

export default MultiLine