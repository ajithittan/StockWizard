function getRandomDecimal(min, max) {
    return Math.random() * (max - min) + min;
}

//needs fixing..not happy
const Textv2 = (g,xScale,yScale,xval,yval,dispTxt) =>{
    //console.log(g,xScale,yScale,xval,yval,dispTxt)
    g.append("text")
    .attr("class","StraightXLineLabel")
    .attr("id","StraightXLineLabel")
    .attr("x", xScale(xval))
    .attr("y", yScale(yval))
    .style("cursor", "pointer")
    .text(dispTxt)
}

export default Textv2