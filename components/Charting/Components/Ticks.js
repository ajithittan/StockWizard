import { axisLeft,axisBottom, timeMonth,timeFormat,width,height} from "d3"

const noOfXTicks = (width) =>{
    if (width > 1200){
        return 1
    }else{
        return 3
    }
}

const xTicks = (g,xScale,yScale,width,height) => {
    g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + yScale.range()[0] + ")")
    .call(axisBottom(xScale).ticks(timeMonth.every(noOfXTicks(width))).tickFormat(timeFormat("%b")))
}
const yTicks = (g,xScale,yScale,width,height) => {
    g.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + xScale.range()[0] / 2 + ", 0)")
    .call(axisLeft(yScale).ticks(5))
}
export {xTicks,yTicks}