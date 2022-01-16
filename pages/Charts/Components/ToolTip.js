import * as d3 from "d3";
import moment from 'moment';

const ToolTip = (tooltipref,xScale,yScale,linedata) =>{
    const tooltip = d3
        .select(tooltipref)
        .attr('class', 'tooltip')
        .style('display', 'none')

    const bisectDate = d3.bisector(function(d) { return moment(d.date); }).left;            
    
    const onMouseOver = (tp) => tp.style('display', null)
    
    const onMouseOut = (tp) => tp.style('display', 'none')

    const onMouseMove = (event,d,tp) =>{
        var xPosition = xScale.invert(event.clientX),
            closestElement = bisectDate(linedata, moment(xPosition), 1),
            d0 = linedata[closestElement - 1],
            d1 = linedata[closestElement],
            d = d1 ? xPosition - d0.date > d1.date - xPosition ? d1 : d0 : d0  

        tp.style("left", (xScale(moment(d.date)) +10)+"px")
            .style("top", (yScale(d.close) + 40)+"px");  
        tp.text(d.date + " " + d.close)
        
    }
    
    
    return {tooltip,onMouseOver,onMouseOut,onMouseMove}

}

export default ToolTip