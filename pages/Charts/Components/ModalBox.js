import * as d3 from "d3";
import ModalBoxContent from './ModalBoxContent'
import ReactDOMServer from 'react-dom/server'

const ModalBox = (modalref,event,display,action) =>{
    d3.select(modalref.current)
      .attr('class', 'modalbox')
      .style('display', display ? null : 'none')
      .html(ReactDOMServer.renderToString(<ModalBoxContent action={action} display={display}/>))
      .style("left", (event.clientX)+"px")
      .style("top", (event.clientY)+"px"); 
}

export default ModalBox