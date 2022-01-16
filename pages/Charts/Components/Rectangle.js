import moment from 'moment';

const Rectangle = (g,chardata,x,y,domainwidth,domainheight,tooltip,onMouseOver,onMouseOut,onMouseMove,xfield,yfield) =>{

    const minDt = moment(chardata.reduce((acc,item)=>{return acc&&new Date(acc)<new Date(item[xfield])?acc:item[xfield]},'')).toDate()
    const maxChng = chardata.reduce((acc,item)=>{return acc&& acc > item[yfield] ?acc:item[yfield]},'')

    g.selectAll("rect_up")
    .data(chardata)
    .enter()
    .append("rect")
        .attr("x", x(minDt))
        .attr("y", y(maxChng))
        .attr("width", domainwidth)
        .attr("height", domainheight)
        .attr("fill", "#EAFFF1")
        .on('mouseover', (event,d) => {console.log("rect",event,d), onMouseOver(tooltip)})
        .on('mouseout', () => onMouseOut(tooltip))
        .on('mousemove', (event,d) => onMouseMove(event,d,tooltip))
}

export default Rectangle