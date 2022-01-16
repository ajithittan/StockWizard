import * as d3 from "d3";

const ModalBox = (modalref,event,display,action) =>{
    //console.log(ReactDOMServer.renderToString(<ModalBoxContent action={action} display={display}/>))
    d3.select(modalref.current)
      .attr('class', 'modalbox')
      .style('display', display ? null : 'none')
      .style("left", (event.clientX)+"px")
      .style("top", (event.clientY)+"px")
    
    d3.select(modalref.current)
    .attr('class', 'modalbox')
    .append("button")
    .html("Price Chart")
    .on("click", () => action())

    d3.select(modalref.current)
    .append("text")
    .html("<br/>")

    d3.select(modalref.current)
    .attr('class', 'modalbox')
    .append("button")
    .html("Minimize")
    .on("click", () => action());  
}

export default ModalBox