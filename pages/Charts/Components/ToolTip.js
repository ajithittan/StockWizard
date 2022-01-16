import * as d3 from "d3";
import moment from 'moment';

const ToolTip = (tooltipref) =>{
    const tooltip = d3
        .select(tooltipref)
        .attr('class', 'tooltip')
        .style('display', 'none')
    
    const onMouseOver = (tp) => tp.style('display', null)
    
    const onMouseOut = (tp) => tp.style('display', 'none')

    const onMouseMove = (event,d,tp) =>{
        console.log("onMouseMove",event.clientX,event.clientY,d)
        return tp
                .style("top", (event.clientX)+"px")
                .style("left",(event.clientY)+"px")
                .html(d.close + "<br /> " + moment(d.date).format("MMM YYYY"))
    }
    
    
    return {tooltip,onMouseOver,onMouseOut,onMouseMove}

}

export default ToolTip