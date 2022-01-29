import {timeDay,scaleTime,extent,scaleLinear} from "d3";
import moment from 'moment';

const XScale = (chartdata,domainwidth,field) =>{

    const minDt = moment(chartdata.reduce((acc,item)=>{return acc&&new Date(acc)<new Date(item[field])?acc:item[field]},'')).toDate()
    const maxDt = moment(chartdata.reduce((acc,item)=>{return acc&&new Date(acc)>new Date(item[field])?acc:item[field]},'')).toDate()
    maxDt = timeDay.offset(maxDt, 2)

    let x = scaleTime()
    .domain([minDt,maxDt])
    .range([0, domainwidth])

    return x
}

const YScale = (chartdata,domainheight,field) =>{

    let yExtent = extent(chartdata.map(item => item[field]));
    let y = scaleLinear()
    .domain(yExtent)
    .range([domainheight, 0]); 

    return y
}

export {XScale, YScale}