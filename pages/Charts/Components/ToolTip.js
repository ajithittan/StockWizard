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
        const minDt = moment(linedata.reduce((acc,item)=>{return acc&&new Date(acc)<new Date(item.date)?acc:item.date},'')).toDate()
        const maxDt = moment(linedata.reduce((acc,item)=>{return acc&&new Date(acc)>new Date(item.date)?acc:item.date},'')).toDate()

        const minChng = linedata.reduce((acc,item)=>{return acc&& acc < item.close ?acc:item.close},'')
        const maxChng = linedata.reduce((acc,item)=>{return acc&& acc > item.close ?acc:item.close},'')

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

        crosshair.select("#crosshairX")
          .attr("x1", mouse[0])
          .attr("y1", yScale(minChng))
          .attr("x2", mouse[0])
          .attr("y2", yScale(maxChng));

        crosshair.select("#crosshairY")
          .attr("x1", xScale(moment(minDt)))
          .attr("y1", mouse[1])
          .attr("x2", xScale(moment(maxDt)))
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

        d3.selectAll("line").remove()
        addCircle(moment(d.date),d.close)
        //addCrossHairs(moment(d.date),d.close,event)

        tp.style("left", (xScale(moment(d.date)))+"px")
          .style("top", (yScale(d.close))+"px")
          .style("z-index",10)
          .html(d.date + "<br /> " + d.close)
    }
    
    
    return {tooltip,onMouseOver,onMouseOut,onMouseMove}

}

export default ToolTip