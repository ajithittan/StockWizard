import { axisLeft,axisBottom, timeMonth,timeFormat} from "d3"
const xTicks = (g,xScale,yScale) => {
    g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + yScale.range()[0] + ")")
    .call(axisBottom(xScale).ticks(timeMonth.every(1)).tickFormat(timeFormat("%b")))
}
const yTicks = (g,xScale,yScale) => {
    g.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + xScale.range()[0] / 2 + ", 0)")
    .call(axisLeft(yScale).ticks(5))
}
export {xTicks,yTicks}