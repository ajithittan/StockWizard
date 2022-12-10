import * as d3 from "d3";
import moment from 'moment';
import MultiLineThemes from '../../../modules/themes/MultiLineThemes'

const ToolTip = (g,tooltipref,xScale,yScale,linedata,dblClick,classNameAppend,showToolTip) =>{
    const closeToolTip = false
    const tooltip = d3.select(tooltipref)
        .attr('class', 'tooltip')
        .style("visibility", "hidden")

    const bisectDate = d3.bisector(function(d) { return moment(d.date); }).left;            

    const addCircle = (x) => {
        g.selectAll("circle")
        .data(linedata)
        .enter()
        .append("circle")
            .attr("cx", xScale(x))
            .attr("cy", d => yScale(d.values.filter(item => x.isSame(item.date))[0].close))
            .attr("r",2)  
            .attr("stroke", "black")
            .attr("fill", "orange")
            //.on("click",() => console.log("clicked?"))
    }
    const addCrossHairs = (x,y,event,d) => {
        const minDt = moment(linedata[0].values.reduce((acc,item)=>{return acc&&new Date(acc)<new Date(item.date)?acc:item.date},'')).toDate()
        const maxDt = moment(linedata[0].values.reduce((acc,item)=>{return acc&&new Date(acc)>new Date(item.date)?acc:item.date},'')).toDate()

        const minChng = linedata[0].values.reduce((acc,item)=>{return acc&& acc < item.close ?acc:item.close},'')
        const maxChng = linedata[0].values.reduce((acc,item)=>{return acc&& acc > item.close ?acc:item.close},'')

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

        crosshair.select("#crosshairX")
          .attr("x1", xScale(x))
          .attr("y1", yScale(minChng))
          .attr("x2", xScale(x))
          .attr("y2", yScale(maxChng))
          .on("dblclick",dblClick)

        crosshair.select("#crosshairY")
          .attr("x1", xScale(moment(minDt)))
          .attr("y1", yScale(y))
          .attr("x2", xScale(moment(maxDt)))
          .attr("y2", yScale(y))
          .on("dblclick",dblClick)
          showToolTip ? addToolTip(moment(minDt),maxChng,d) : null
    } 

    const addToolTip = (x,y,d) =>{
      tooltip.style("left", xScale(moment(x)) + 30 +"px")
      .style("top", yScale(y) + 10 + "px")
      .style("z-index",50)
      .html("Date: " + d.date + "<br /> " + "Open: " + d.open + "<br /> " + "High: " + d.high + "<br /> " + "Low: " + d.low + "<br /> "  + "Close: " + d.close)
      .on("click",() => (tooltip.style("visibility", "hidden"),closeToolTip=true))
    }
    
    const onMouseOver = () => closeToolTip ? null : tooltip.style("visibility", "visible")
    
    const onMouseOut = () => closeToolTip ?  null : tooltip.style("visibility", "visible")

    const onMouseMove = (event) =>{
        //tooltip.style("visibility", "hidden")
        //console.log("eventeventeventevent",xScale.invert(d3.pointer(event)[0]))
        let xPosition = xScale.invert(d3.pointer(event)[0]),
            closestElement = bisectDate(linedata[0].values, moment(xPosition), 1),
            d0 = linedata[0].values[closestElement - 1],
            d1 = linedata[0].values[closestElement],
            d = d1 ? xPosition - d0.date > d1.date - xPosition ? d1 : d0 : d0  

        d3.selectAll("line.crosshair").remove()
        d3.selectAll("circle").remove()
        addCircle(moment(d.date))
        addCrossHairs(moment(d.date),d.close,event,d)
        closeToolTip ? d3.selectAll("text.ToolTipText" + classNameAppend).remove() : 
                       Text(moment(d.date),yScale(d.close), d.close + " - " + d.date)
    }

    const Text = (x,y,dispTxt) => {
      d3.selectAll("text.ToolTipText" + classNameAppend).remove()

      g.selectAll(".line")
      .data(linedata)
      .enter()
      .append("text")      // text label for the x axis
      .attr("x", xScale(x))
      .attr("y", d => yScale(d.values.filter(item => x.isSame(item.date))[0].close))
      .attr("class","ToolTipText" + classNameAppend)
      .style("text-anchor", "middle")
      .style("fill", (d,indx) => indx===0? "#041E42" : MultiLineThemes[indx])
      .html(d => d.values.filter(item => x.isSame(item.date))[0].close);
  }
    
    return {tooltip,onMouseOver,onMouseOut,onMouseMove}

}

export default ToolTip