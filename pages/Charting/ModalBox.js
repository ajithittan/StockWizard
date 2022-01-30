import * as d3 from "d3";

const ModalBox = (modalref,event,display,action,symbol) =>{
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
    .on("click", () => action(symbol))

    d3.select(modalref.current)
    .attr('class', 'modalbox')
    .append("button")
    .html("Remove")
    .on("click", () => action(symbol))
}

export default ModalBox