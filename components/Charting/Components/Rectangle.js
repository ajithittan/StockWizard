
const Rectangle = (g,domainwidth,domainheight,tooltip,onMouseOver,onMouseOut,onMouseMove,onDblClk,fill,resetOnMouseOver) =>{
    g
    .append("rect")
        .attr("width", domainwidth)
        .attr("height", domainheight)
        .attr("fill",fill)
        .style("opacity","0.1")
        .on('mouseover', (event,d) => {onMouseOver()})
        .on('mouseout', () => onMouseOut())
        .on('mousemove', (event,d) => {onMouseMove(event),resetOnMouseOver()})
        .on('dblclick',onDblClk)
}

export default Rectangle