const Textv2 = (g,xScale,yScale,xval,yval,dispTxt) =>{
    g.append("text")
    .attr("class","ChartHeader")
    .style("text-anchor", "middle")
    .attr("x", xScale(xval))
    .attr("y", yScale(yval))
    .style("cursor", "pointer")
    .on("click",() => console.log(ixval,yval))
    .html(dispTxt)
}

export default Textv2