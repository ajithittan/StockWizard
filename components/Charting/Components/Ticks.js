import { axisLeft,axisBottom, timeMonth,timeYear,timeFormat,width,height, timeHour} from "d3"

const noOfXTicks = (width) =>{
    if (width > 1200){
        return 2
    }    
    else if (width > 960){
        return 4
    }else{
        return 6
    }
}

const absNoOfXTicksTime = (width) =>{
    if (width > 1200){
        return 10
    }    
    else if (width > 960){
        return 4
    }else{
        return 5
    }
}

const xTicks = (g,xScale,yScale,width,height,allticks,numberOfTicks,id) => {
    if (numberOfTicks){
        g.append("g")
        .attr("id", "xScale_" + id||0)
        .attr("class", "x axis")
        .attr("transform", "translate(0," + yScale.range()[0] + ")")
        .call(axisBottom(xScale).ticks(numberOfTicks).tickFormat(timeFormat("%b")))   
    }else{
        let no_of_ticks = allticks ? 1 : noOfXTicks(width)
        g.append("g")
        .attr("id", "xScale")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + yScale.range()[0] + ")")
        .call(axisBottom(xScale).ticks(timeMonth.every(no_of_ticks)).tickFormat(timeFormat("%b")))    
    }

    g.append("g")
    .attr("id", "xScale")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + yScale.range()[0] + ")")
    .call(axisBottom(xScale).ticks(timeYear).tickFormat(timeFormat("%Y")).tickPadding([20]))
}
const yTicks = (g,xScale,yScale,width,height,id) => {
    g.append("g")
    .attr("id", "yScale" + id||0)
    .attr("class", "yaxis")
    .attr("transform", "translate(" + xScale.range()[0] / 2 + ", 0)")
    .call(axisLeft(yScale).ticks(5))
}
const xTicksNum = (g,xScale,yScale,width,height,id) => {
    g.append("g")
    .attr("id", "xScale")
    .attr("class", "xaxis")
    .attr("transform", "translate(0," + yScale.range()[0] + ")")
    .call(axisBottom(xScale).ticks(5))
}

const xTicksTime = (g,xScale,yScale,width,height,id,noofticks) => {
    let no_of_ticks = noofticks ? noofticks : absNoOfXTicksTime(width)
    g.append("g")
    .attr("id", "xScale")
    .attr("class", "xaxis")
    .attr("transform", "translate(0," + yScale.range()[0] + ")")
    .call(axisBottom(xScale).ticks(no_of_ticks).tickFormat(timeFormat("%H:%M")))
}

export {xTicks,yTicks,xTicksNum,xTicksTime}