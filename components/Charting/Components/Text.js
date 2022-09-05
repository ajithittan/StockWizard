const Text = (g,x,y,dispTxt) => {
    g.append("text")      // text label for the x axis
    .attr("x",x)
    .attr("y",y)
    .attr("class","ChartHeader")
    .style("text-anchor", "middle")
    .html(dispTxt);
}
export default Text