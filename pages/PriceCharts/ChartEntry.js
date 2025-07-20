import { useState,useEffect,forwardRef } from 'react'
import WaitingForResonse from '../../components/WaitingForResponse'
import ChartMain from './ChartMain'

const ChartEntry = forwardRef((props,inpref) =>{

    const [waiting,setWaiting] = useState(true) 
    const [chartFullData,setChartFullData] = useState(null)
    const [chartelements,setChartElements] = useState(["AXIS","LINE","TOOLTIP"])
    
    useEffect(() =>{
        if (props.chartdata && props.chartdata.length >0){
            setChartFullData(props.chartdata)
            setWaiting(false)
        }
    },[props.chartdata])

    return (
        <>
            {
                <div style={{paddingLeft:"20px",paddingBottom:"10px"}}>
                    {
                        waiting ? <WaitingForResonse width={50} height={50}/> : 
                            <ChartMain initchartdata={chartFullData} initchartprops={chartelements} ref={inpref} stock={props.stock}></ChartMain>
                    }
                </div>
            }
        </>
    )

})

export default ChartEntry