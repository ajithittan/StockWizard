const Image = (g,xPos,yPos,x,y,imageurl) =>{
    g.append("svg:image")
    .attr("xlink:href", imageurl)
    .attr("width", 20)
    .attr("height", 20)
    .attr("x", xPos-10)
    .attr("y", yPos-1)
    .style("cursor", "pointer")
    .on("click",() => console.log(x,y) )
}

export default Image