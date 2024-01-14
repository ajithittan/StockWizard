import * as d3 from "d3";
import moment from 'moment';
import MultiLineThemes from '../../../modules/themes/MultiLineThemes'

const ToolTipv2 = (g,tooltipref,xScale,yScale,linedata,dblClick,classNameAppend,showToolTip,arrow,callbacks,tooltiptype) =>{

    let closeToolTip = false
    const tooltip = d3.select(tooltipref)
        .attr('class', 'tooltip_' + tooltiptype)
        .style("visibility", "hidden")

    const bisectDate = d3.bisector(function(d) { return moment(d.date); }).left;  
    
    function handleMouseOver(d, i) {  
      d3.select(this).transition()
          .duration(1)
          .attr("r", 10)
          .attr("fill", "#FFD580")
          .style("cursor", "pointer")
    }

    const resetArrows = () => {g.selectAll("#arrowUP").remove(),g.selectAll("#arrowDN").remove()}

    function upArrow (d,x,y){
      d3.selectAll("#arrowUP").remove()
      g.append("text")  
      .attr("id", "arrowUP")
      .attr("x", d.offsetX)
      .attr("y", d.offsetY)
      .style("z-index",50)
      .style('opacity',0.8)
      .style("fill", "green")
      .style("font-size", "30px")
      .style("cursor", "pointer")
      .on("click",() => {resetArrows(),callbacks({"alerttype":"U","close":y,"threshold":y,"date":x,"xPos":xScale(x),"yPos":yScale(y)})})
      .html("&#8599;")
      setTimeout(() => g.selectAll("#arrowUP").transition().style('opacity',0.5).duration(800).remove(),5000)
    }

    function downArrow (d,x,y){
      d3.selectAll("#arrowDN").remove()
      g.append("text")
        .attr("id", "arrowDN")
        .attr("x", d.offsetX-20)
        .attr("y", d.offsetY+20)
        .style('opacity',0.8)
        .style("z-index",50)
        .style("fill", "red")
        .style("font-size", "30px")
        .style("cursor", "pointer")
        .on("click",() => {resetArrows(),callbacks({"alerttype":"D","close":y,"threshold":y,"date":x,"xPos":xScale(x),"yPos":yScale(y)})})
        .html("&#8601;")
        setTimeout(() => g.selectAll("#arrowDN").transition().style('opacity',0.5).duration(900).remove(),5000)
    }


    function addCallToAction(d,x,y) {
      upArrow(d,x,y)
      downArrow(d,x,y)
    }

    const addCircle = (x,y) => {
        g.append("circle")
            .attr("cx", xScale(x))
            .attr("cy", yScale(y))
            .attr("r",5)  
            .attr("stroke", "black")
            .attr("fill", "orange")
            .on("mouseover", handleMouseOver)
            //.on("mouseout", () => setTimeout(() => d3.selectAll("#arrows").remove(),1500))
            .style("cursor", "pointer")
            //.on("click",() => callbacks({"close":y,"date":x,"xPos":xScale(x),"yPos":yScale(y)}))
            .on("click",(d,i) => addCallToAction(d,x,y))
    }
    const addCrossHairs = (x,y,d) => {
        const minDt = moment(linedata.reduce((acc,item)=>{return acc&&new Date(acc)<new Date(item.date)?acc:item.date},'')).toDate()
        const maxDt = moment(linedata.reduce((acc,item)=>{return acc&&new Date(acc)>new Date(item.date)?acc:item.date},'')).toDate()

        const minChng = linedata.reduce((acc,item)=>{return acc&& acc < item.close ?acc:item.close},'')
        const maxChng = linedata.reduce((acc,item)=>{return acc&& acc > item.close ?acc:item.close},'')

        const crosshair = g.append("g")
        .attr("class", "line1")
  
      // create horizontal line
        crosshair.append("line")
            .attr("id", "crosshairX")
            .attr("class", "crosshair")
  
      // create vertical line
        crosshair.append("line")
            .attr("id", "crosshairY")
            .attr("class", "crosshair")

        crosshair.select("#crosshairX")
          .attr("x1", xScale(x))
          .attr("y1", yScale(minChng))
          .attr("x2", xScale(x))
          .attr("y2", yScale(maxChng))
          .on("dblclick",dblClick)

        d3.selectAll("text.ToolTipXLabel").remove()

        crosshair.append("text")
          .attr("x", xScale(x) - 35)
          .attr("class","ToolTipXLabel")
          .attr("id", "ToolTipXLabel")
          .attr("y", yScale(minChng))
          .text(d.date)

        crosshair.append("text")
          .attr("x", xScale(moment(minDt)))
          .attr("class","ToolTipXLabel")
          .attr("id", "ToolTipXLabel")
          .attr("y", yScale(y))
          .text(d.close)  

        crosshair.select("#crosshairY")
          .attr("x1", xScale(moment(minDt)))
          .attr("y1", yScale(y))
          .attr("x2", xScale(moment(maxDt)))
          .attr("y2", yScale(y))
          .on("dblclick",dblClick)
          showToolTip ? addToolTip(moment(minDt),maxChng,d) : null
    } 

    const getToolTipHtml = (d) =>{
      if (tooltiptype === "C"){
        return d.open + "(O) " + d.high + "(H) " + d.low + "(L) " + d.close + "(C)  " + d.date
      }else{
        return "Date: " + d.date + "<br /> " + "Open: " + d.open + "<br /> " + "High: " + d.high + "<br /> " + "Low: " + d.low + "<br /> "  + "Close: " + d.close
      }
    }

    const addToolTip = (x,y,d) =>{
      tooltip
      .style("left", tooltiptype === "C" ? 0 : xScale(moment(x)) + 30 +"px")
      .style("top",  tooltiptype === "C" ? yScale(y) - 30 + "px" : yScale(y) + 10 + "px")
      .style("z-index",50)
      .html(getToolTipHtml(d))
      .on("click",() => (tooltip.style("visibility", "hidden"),closeToolTip=true))
    }
    
    const onMouseOver = () => closeToolTip ? null : tooltip.style("visibility", "visible")
    
    const onMouseOut = () => closeToolTip ?  null : tooltip.style("visibility", "visible")

    const onMouseMove = (event) =>{

        //tooltip.style("visibility", "hidden")
        //console.log("eventeventeventevent",xScale.invert(d3.pointer(event)[0]))
        let xPosition = xScale.invert(d3.pointer(event)[0]),
            closestElement = bisectDate(linedata, moment(xPosition), 1),
            d0 = linedata[closestElement - 1],
            d1 = linedata[closestElement],
            d = d1 ? xPosition - d0.date > d1.date - xPosition ? d1 : d0 : d0  

        d3.selectAll("line.crosshair").remove()
        d3.selectAll("circle").remove()
        addCircle(moment(d.date),d.close)
        addCrossHairs(moment(d.date),d.close,d)
        closeToolTip ? d3.selectAll("text.ToolTipText" + classNameAppend).remove() : 
                       Text(moment(d.date),d.close)
    }

    const onArrMove = (x_date,y_close,d) =>{
      tooltip.style("visibility", "visible")
      d3.selectAll("line.crosshair").remove()
      d3.selectAll("circle").remove()
      addCircle(moment(x_date))
      addCrossHairs(moment(x_date),y_close,d)
      closeToolTip ? d3.selectAll("text.ToolTipText" + classNameAppend).remove() : 
                     Text(moment(x_date),y_close)

    }

    const Text = (x,y) => {
      d3.selectAll("text.ToolTipText" + classNameAppend).remove()

      g.append("text")      // text label for the x axis
      .attr("x", xScale(x))
      .attr("y", yScale(y) - 10)
      .attr("class","ToolTipText" + classNameAppend)
      .style("text-anchor", "middle")
      .style("fill", (d,indx) => indx===0? "#041E42" : MultiLineThemes[indx])
      .html(y)
  }

    if (arrow){
      onArrMove(arrow.date,arrow.close,arrow)
    }
    
    return {tooltip,onMouseOver,onMouseOut,onMouseMove}

}

export default ToolTipv2