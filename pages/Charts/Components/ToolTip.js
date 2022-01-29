import * as d3 from "d3";
import moment from 'moment';

const ToolTip = (g,tooltipref,xScale,yScale,linedata,dblClick) =>{
    const tooltip = d3.select(tooltipref)
        .attr('class', 'tooltip')
        .style("visibility", "hidden")

    const bisectDate = d3.bisector(function(d) { return moment(d.date); }).left;            

    const addCircle = (x,y) => {
        //console.log("addCircle",x,y)
        g.selectAll("circle")
        .data(linedata)
        .join("circle")
            .attr("cx", xScale(x))
            .attr("cy", yScale(y))
            .attr("r",5)  
            .attr("stroke", "black")
            .attr("fill", "orange")
            .on("click",() => console.log("clicked?"))
    }
    const addCrossHairs = (x,y,event) => {
        const minDt = moment(linedata.reduce((acc,item)=>{return acc&&new Date(acc)<new Date(item.date)?acc:item.date},'')).toDate()
        const maxDt = moment(linedata.reduce((acc,item)=>{return acc&&new Date(acc)>new Date(item.date)?acc:item.date},'')).toDate()

        const minChng = linedata.reduce((acc,item)=>{return acc&& acc < item.close ?acc:item.close},'')
        const maxChng = linedata.reduce((acc,item)=>{return acc&& acc > item.close ?acc:item.close},'')

        const crosshair = g.append("g")
        .attr("class", "line1");
  
      // create horizontal line
        crosshair.append("line")
            .attr("id", "crosshairX")
            .attr("class", "crosshair");
  
      // create vertical line
        crosshair.append("line")
            .attr("id", "crosshairY")
            .attr("class", "crosshair");

        let mouse = d3.pointer(event);

        crosshair.select("#crosshairX")
          .attr("x1", mouse[0])
          .attr("y1", yScale(minChng))
          .attr("x2", mouse[0])
          .attr("y2", yScale(maxChng))
          .on("dblclick",dblClick)

        crosshair.select("#crosshairY")
          .attr("x1", xScale(moment(minDt)))
          .attr("y1", mouse[1])
          .attr("x2", xScale(moment(maxDt)))
          .attr("y2", mouse[1])
          .on("dblclick",dblClick)
          addCircle(x,y)
    } 
    
    const onMouseOver = () => tooltip.style("visibility", "visible")
    
    const onMouseOut = () => tooltip.style("visibility", "visible")

    const onMouseMove = (event) =>{
        tooltip.style("visibility", "hidden")
        let xPosition = xScale.invert(d3.pointer(event)[0]),
            closestElement = bisectDate(linedata, moment(xPosition), 1),
            d0 = linedata[closestElement - 1],
            d1 = linedata[closestElement],
            d = d1 ? xPosition - d0.date > d1.date - xPosition ? d1 : d0 : d0  
            //console.log(event,d3.pointer(event),closestElement)

        d3.selectAll("line").remove()
        addCrossHairs(moment(d.date),d.close,event)

        tooltip.style("left", xScale(moment(d.date))+"px")
          .style("top", yScale(d.close)+"px")
          .style("z-index",100)
          .html(d.date + "<br /> " + d.close)   
    }
    
    
    return {tooltip,onMouseOver,onMouseOut,onMouseMove}

}

export default ToolTip