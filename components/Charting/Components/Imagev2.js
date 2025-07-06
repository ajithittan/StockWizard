import moment from 'moment';

const Imagev2 = (g,xScale,yScale,inpVals,imageurl) =>{
    g.append("svg:image")
    .attr("xlink:href", imageurl)
    .attr("width", 20)
    .attr("height", 20)
    .attr("x", xScale(inpVals.x)-10)
    .attr("y", yScale(inpVals.y)-1)
    .style("cursor", "pointer")
    .on("click",() => console.log(inpVals.x,inpVals.y))
}

export default Imagev2