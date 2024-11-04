const Circle = (g,charData,x,y,xfield,yfield,lfield,callBackFunction) => {

    //console.log("circle",charData)
    g.selectAll("circle")
    .data(charData)
    .join("circle")
        .attr("cx",d => x(d[xfield]))
        .attr("cy",d => y(d[yfield]))
        .attr("r",8)  
        .on("click", (event, d) => callBackFunction(d.symbol))
        .attr("id", (d) => "c_" + d.symbol)
        .style("cursor", "pointer")
        .style("fill", "white")
        .style("stroke", "gray")
        .transition()
        .duration(500)   
        
        g.selectAll("textCircle")
        .data(charData)
        .enter()
        .append("text")
            .attr("x", d => x(d[xfield])+20)
            .attr("y", d => y(d[yfield]))
            .text(d => d[lfield])
            .on("click", (event, d) => callBackFunction(d.symbol))
            .attr("id", (d) => "ct_" + d.symbol)
            .style("text-anchor", "middle")
            .style("font-size", "8pt")
            .style("fill", "#C8C8C8");
}

export default Circle