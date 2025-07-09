import * as d3 from "d3";

const Imagev2 = (g,xScale,yScale,xval,yval,imageurl,onclickshow) =>{
    g.append("svg:image")
    .attr("xlink:href", imageurl)
    .attr("width", 20)
    .attr("height", 20)
    .attr("x", xScale(xval))
    .attr("y", yScale(yval))
    .style("cursor", "pointer")
    .on("click",() => console.log(onclickshow))
    .style("cursor", "pointer")
    .on("mouseover", function(event, d) {
        // Select the parent group (g) or the SVG element
        //const g = d3.select(this.parentNode);
        const [x, y] = d3.pointer(event, this);
        // Append a text element
        const text = g.append("text")
            .attr("x",x) // Adjust position as needed
            .attr("y", y-10) // Adjust position as needed
            .attr("dy", ".35em") // Adjust vertical alignment
            .text(onclickshow) // Display the data value
            .style("opacity", 0); // Initially hidden
    
        // Fade in the text on mouseover
        text.transition()
            .duration(200)
            .style("opacity", 1);
    })
    .on("mouseout", function(event, d) {
        // Fade out the text on mouseout
        d3.select(this.parentNode).select("text")
            .transition()
            .duration(700)
            .style("opacity", 0)
            .remove(); // Remove the text element
    })
}

export default Imagev2