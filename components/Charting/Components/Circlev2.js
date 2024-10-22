const Circle = (g,charData,x,y,xfield,yfield,lfield) => {

    console.log("circle",charData)
    g.selectAll("circle")
    .data(charData)
    .join("circle")
        .attr("cx",d => x(d[xfield]))
        .attr("cy",d => y(d[yfield]))
        .attr("r",15)  
        .on("click", (event, d) => props.openPrcChart(d.symbol))
        .style("cursor", "pointer")
        .style("fill", "#DAF7A6")
        .transition()
        .duration(500)   
        
        g.selectAll("textCircle")
        .data(charData)
        .enter()
        .append("text")
            .attr("x", d => x(d[xfield])+20)
            .attr("y", d => y(d[yfield]))
            .text(d => d[lfield])
            .style("text-anchor", "middle")
            .style("font-size", "10pt")
            .style("fill", "#344761");
              
}

export default Circle