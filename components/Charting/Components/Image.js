import moment from 'moment';

const Image = (g,xScale,yScale,inpVals,imageurl) =>{
    console.log(inpVals)
    g.append("svg:image")
    .attr("xlink:href", imageurl)
    .attr("width", 20)
    .attr("height", 20)
    .attr("x", xScale(moment(inpVals.date))-10)
    .attr("y", yScale(inpVals.close)-1)
    .style("cursor", "pointer")
    .on("click",() => console.log(inpVals.date,inpVals.close))
}

export default Image