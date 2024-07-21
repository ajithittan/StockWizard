import * as d3 from "d3";
import { useEffect, useRef, useState } from "react"

const BubblesChart = (props) =>{

    const ref = useRef()


    useEffect(() =>{

        if (props.nodes && props.nodes.length > 0){
            var width = 1000, height = 500;

            const svgElement = d3.select(ref.current)
            svgElement.attr("width",width).attr("height",height)
    
            let colorScale = ['yellow','green','orange', 'lightblue', 'purple','grey'];
            let xCenter = [50,200,400, 600, 800];
            
            /***
            let numNodes = props.nodes.length;
            let nodes = d3.range(numNodes).map(function(d, i) {
                return {
                    radius: Math.random() * 25,
                    category: i % 3
                }
            });
            */

           let nodes = props.nodes.map(item => ({label:item["stock"],radius:item["value"]*30,category:item["category"]}))

           console.log("nodes",nodes)
    
            const ticked = () => {
                d3.select(ref.current)
                    .selectAll('circle')
                    .data(nodes)
                    .join('circle')
                    .attr('r', function(d) {
                        return d.radius;
                    })
                    .style('fill', function(d) {
                        return colorScale[d.category];
                    })
                    .attr('cx', function(d) {
                        return d.x;
                    })
                    .attr('cy', function(d) {
                        return d.y;
                    });

                d3.select(ref.current)
                    .selectAll('text')
                    .data(nodes)
                    .join('text')
                    .text(node => node.label)
                    .attr('font-size',4)//font size
                    .attr('dx', function(d) {
                        return d.x -12;
                    })
                    .attr('dy', function(d) {
                        return d.y+4;
                    })
            }
            d3.forceSimulation(nodes)
                .force('charge', d3.forceManyBody().strength(1))
                .force('x', d3.forceX().x(function(d) {
                    return xCenter[d.category];
                }))
                .force('collision', d3.forceCollide().radius(function(d) {
                    return d.radius;
                }))
                .on('tick', ticked);
        }       
    },[props.nodes])

    return (
        <>
            <svg ref={ref} className="globe-svg"/>
        </>

    )
}

export default BubblesChart