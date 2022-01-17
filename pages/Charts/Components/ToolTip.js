import * as d3 from "d3";
import moment from 'moment';

const ToolTip = (g,tooltipref,xScale,yScale,linedata) =>{
    const tooltip = d3
        .select(tooltipref)
        .attr('class', 'tooltip')
        .style('display', 'none')

    const bisectDate = d3.bisector(function(d) { return moment(d.date); }).left;            

    const addCircle = (x,y) => {
        g.selectAll("circle")
        .data(linedata)
        .join("circle")
            .attr("cx", xScale(x))
            .attr("cy", yScale(y))
            .attr("r",5)  
            .attr("stroke", "black")
            .attr("fill", "orange")
    }
    const addCrossHairs = (x,y,event) => {
        var crosshair = g.append("g")
        .attr("class", "line1");
  
      // create horizontal line
        crosshair.append("line")
            .attr("id", "crosshairX")
            .attr("class", "crosshair");
  
      // create vertical line
        crosshair.append("line")
            .attr("id", "crosshairY")
            .attr("class", "crosshair");

        var mouse = d3.pointer(event);
        var x = mouse[0];
        var y = mouse[1];

        crosshair.select("#crosshairX")
          .attr("x1", mouse[0])
          .attr("y1", yScale(linedata[0].close))
          .attr("x2", mouse[0])
          .attr("y2", yScale(linedata[linedata.length - 1].close));

        crosshair.select("#crosshairY")
          .attr("x1", xScale(moment(linedata[0].date)))
          .attr("y1", mouse[1])
          .attr("x2", xScale(moment(linedata[linedata.length - 1].date)))
          .attr("y2", mouse[1]);
    }
    
    const onMouseOver = (tp) => tp.style('display', null)
    
    const onMouseOut = (tp) => tp.style('display', 'none')

    const onMouseMove = (event,d,tp) =>{
        console.log(event,d3.pointer(event))
        var xPosition = xScale.invert(event.clientX),
            closestElement = bisectDate(linedata, moment(xPosition), 1),
            d0 = linedata[closestElement - 1],
            d1 = linedata[closestElement],
            d = d1 ? xPosition - d0.date > d1.date - xPosition ? d1 : d0 : d0  

        tp.style("left", (xScale(moment(d.date)))+"px")
          .style("top", (yScale(d.close))+"px")
          .html(d.date + "<br /> " + d.close)

        addCircle(moment(d.date),d.close)
        d3.selectAll("line").remove()
        addCrossHairs(moment(d.date),d.close,event)
    }
    
    
    return {tooltip,onMouseOver,onMouseOut,onMouseMove}

}

export default ToolTip