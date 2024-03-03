import { useState,useRef, useEffect } from 'react'
import ChartScatter from '../PriceCharts/ChartScatter'

const DispScatterChart = () =>{
    const ref = useRef()
    return(
        <>
        <div>test</div>
        <ChartScatter stock="ALL" ref={ref}></ChartScatter>
        </>
    )
    
}

export default DispScatterChart