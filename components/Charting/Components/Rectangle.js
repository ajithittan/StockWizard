
const Rectangle = (g,domainwidth,domainheight,tooltip,onMouseOver,onMouseOut,onMouseMove,onDblClk,fill) =>{
    g
    .append("rect")
        .attr("width", domainwidth)
        .attr("height", domainheight)
        .attr("fill",fill)
        .style("opacity","0.5")
        .on('mouseover', (event,d) => onMouseOver())
        .on('mouseout', () => onMouseOut())
        .on('mousemove', (event,d) => onMouseMove(event,tooltip))
        .on('dblclick',onDblClk)
}

export default Rectangle