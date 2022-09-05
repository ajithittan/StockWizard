
const Rectangle = (g,domainwidth,domainheight,tooltip,onMouseOver,onMouseOut,onMouseMove,onDblClk) =>{
    g
    .append("rect")
        .attr("width", domainwidth)
        .attr("height", domainheight)
        .attr("fill", "#EAFFF1")
        .style("opacity","0.5")
        .on('mouseover', (event,d) => onMouseOver())
        .on('mouseout', () => onMouseOut())
        .on('mousemove', (event,d) => onMouseMove(event,tooltip))
        .on('dblclick',onDblClk)
}

export default Rectangle