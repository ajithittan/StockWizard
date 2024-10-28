import {timeDay,scaleTime,extent,scaleLinear} from "d3";
import moment from 'moment';

const XScale = (chartdata,domainwidth,field) =>{

    let minDt = moment(chartdata.reduce((acc,item)=>{return acc&&new Date(acc)<new Date(item[field])?acc:item[field]},'')).toDate()
    let maxDt = moment(chartdata.reduce((acc,item)=>{return acc&&new Date(acc)>new Date(item[field])?acc:item[field]},'')).toDate()
    maxDt = timeDay.offset(maxDt, 10)

    let x = scaleTime()
    .domain([minDt,maxDt])
    .range([0, domainwidth])

    return x
}

const YScale = (rangeOfAxis,domainheight) =>{

    let y = scaleLinear()
    .domain(rangeOfAxis)
    .range([domainheight, 0])

    return y
}

const XScaleNum = (xExtent,domainwidth,field) =>{

    let x = scaleLinear()
    .domain(xExtent)
    .range([0, domainwidth])

    return x
}


export {XScale, YScale ,XScaleNum}