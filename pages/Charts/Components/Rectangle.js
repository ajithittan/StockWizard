
const Rectangle = (g,domainwidth,domainheight,tooltip,onMouseOver,onMouseOut,onMouseMove) =>{
    g
    .append("rect")
        .attr("width", domainwidth)
        .attr("height", domainheight)
        .attr("fill", "#EAFFF1")
        .style("opacity","0.5")
        .on('mouseover', (event,d) => onMouseOver(tooltip))
        .on('mouseout', () => onMouseOut(tooltip))
        .on('mousemove', (event,d) => onMouseMove(event,d,tooltip))
}

export default Rectangle