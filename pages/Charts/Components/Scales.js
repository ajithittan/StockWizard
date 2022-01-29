import * as d3 from "d3";
import moment from 'moment';

const XScale = (chartdata,domainwidth,field) =>{

    const minDt = moment(chartdata.reduce((acc,item)=>{return acc&&new Date(acc)<new Date(item[field])?acc:item[field]},'')).toDate()
    const maxDt = moment(chartdata.reduce((acc,item)=>{return acc&&new Date(acc)>new Date(item[field])?acc:item[field]},'')).toDate()

    let x = d3.scaleTime()
    .domain([minDt,maxDt])
    .range([0, domainwidth]);

    return x
}

const YScale = (chartdata,domainheight,field) =>{

    let yExtent = d3.extent(chartdata.map(item => item[field]));
    let y = d3.scaleLinear()
    .domain(yExtent)
    .range([domainheight, 0]); 

    return y
}

export {XScale, YScale}