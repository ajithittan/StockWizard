import { axisLeft,axisBottom, timeMonth,timeYear,timeFormat,width,height} from "d3"

const noOfXTicks = (width) =>{
    if (width > 1200){
        return 2
    }else{
        return 1
    }
}

const xTicks = (g,xScale,yScale,width,height) => {
    g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + yScale.range()[0] + ")")
    .call(axisBottom(xScale).ticks().tickFormat(timeFormat("%b")))

    g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + yScale.range()[0] + ")")
    .call(axisBottom(xScale).ticks(timeYear).tickFormat(timeFormat("%Y")).tickPadding([20]))
}
const yTicks = (g,xScale,yScale,width,height) => {
    g.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + xScale.range()[0] / 2 + ", 0)")
    .call(axisLeft(yScale).ticks(5))
}
export {xTicks,yTicks}