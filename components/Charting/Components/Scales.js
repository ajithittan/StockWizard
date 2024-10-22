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

const YScale = (chartdata,domainheight,field) =>{

    let yExtent = extent(chartdata.map(item => item[field]));
    yExtent = [yExtent[0]*0.98,yExtent[1] * 1.05]
    let y = scaleLinear()
    .domain(yExtent)
    .range([domainheight, 0])

    return y
}

const XScaleNum = (chartdata,domainwidth,field) =>{
    let xExtent = extent(chartdata.map(item => item[field]));
    xExtent = [xExtent[0]*0.99,xExtent[1] * 1.05]

    let x = scaleLinear()
    .domain(xExtent)
    .range([0, domainwidth])

    return x
}


export {XScale, YScale ,XScaleNum}