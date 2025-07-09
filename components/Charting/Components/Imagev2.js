import moment from 'moment';

const Imagev2 = (g,xScale,yScale,xval,yval,imageurl,onclickshow) =>{
    g.append("svg:image")
    .attr("xlink:href", imageurl)
    .attr("width", 20)
    .attr("height", 20)
    .attr("x", xScale(xval))
    .attr("y", yScale(yval))
    .style("cursor", "pointer")
    .on("click",() => console.log(onclickshow))
}

export default Imagev2