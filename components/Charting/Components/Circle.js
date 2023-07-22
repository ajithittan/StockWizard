
const Circle = (g,charData) => {
    g.selectAll("circle")
        .data(charData)
        .join("circle")
            .attr("cx",d => x(moment(d.date).toDate()))
            .attr("cy",d => y(d.change))
            .attr("r",5)  
            .on("click", (event, d) => {
                if (sumstat.length > 1) 
                    {svgElement.selectAll("*").remove(),removeFromList(d.symbol)}
                else{
                    ModalBox(modalref,event,true,action)
                }    
            })
            .on('mouseover', () => {
                tooltip.style('display', null);
            })
            .on('mouseout', () => {
                tooltip
                    .transition()
                    .duration(300)
                    .style('display', 'none')
            })
            .on("mouseover", function(event,d) {
                tooltip.style("left", (event.clientX + 10)+"px")
                .style("top", (event.clientY +10)+"px");  
            tooltip.transition()
            .duration(200)
            .style('display', null);
            tooltip.html(d.change + "%" + "<br /> " + moment(d.date).format("MMM YYYY"))
            })
            .transition()
            .duration(1000)
}
export default Circle