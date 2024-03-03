import { useState,useEffect,forwardRef } from 'react'
import WaitingForResonse from '../../components/WaitingForResponse'
import getStockPriceHist from '../../modules/cache/cacheprice'
import ChartMain from './ChartMain'

const ChartScatter = forwardRef((props,inpref) =>{

    const [waiting,setWaiting] = useState(false) 
    const [chartFullData,setChartFullData] = useState([{close:1,date:"2024-02-23"},{close:2,date:"2024-02-24"},{close:3,date:"2024-02-25"},{close:4,date:"2024-02-26"},{close:5,date:"2024-02-27"}])
    const [chartelements,setChartElements] = useState(["AXIS","TOOLTIP"])
    

    return (
        <>
            {
                <div style={{paddingLeft:"20px",paddingBottom:"10px"}}>
                    <ChartMain initchartdata={chartFullData} initchartprops={chartelements} ref={inpref} stock={props.stock}></ChartMain>
                </div>
            }
        </>
    )

})

export default ChartScatter