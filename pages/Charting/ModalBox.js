import * as d3 from "d3";
import ModalBoxContent from './ModalBoxContent'
import ReactDOMServer from 'react-dom/server'

const ModalBox = (modalref,event,display,action) =>{
    //console.log(ReactDOMServer.renderToString(<ModalBoxContent action={action} display={display}/>))
    
    d3.select(modalref.current)
      .attr('class', 'modalbox')
      .style('display', display ? null : 'none')
      .style("left", (event.clientX)+"px")
      .style("top", (event.clientY)+"px")
      .html("This is a modal" + "<br /><br /> ")
    
    d3.select(modalref.current)
    .attr('class', 'modalbox')
    .append("button")
    .html("Click me")
    .on("click", () => action());  
}

export default ModalBox