import MultiLineChart from './MultiLineChart';
import ControlPlane from './ControlPlane'
import { useEffect, useState } from 'react';
import {useAppContext} from '../../modules/state/stockstate'

const index = () => {
    const stklist = useAppContext()
    const [lstOfStcks,setlstOfStcks] = useState(null)
    const [duration,setDuration] = useState(12)
    console.log("durationdurationdurationduration",duration)

    useEffect(() =>{
        if (!lstOfStcks){
            setlstOfStcks(stklist)
        }
    },[stklist])

    const removefromlst = (stk) =>{
        setlstOfStcks([...lstOfStcks.filter(item => item !==stk)])
    }

    console.log("stkliststkliststkliststkliststklist",stklist)

    return (
        <div className="flex-container">
            <div className="flex-child main">
                <MultiLineChart key={duration+lstOfStcks} dur={duration} stocks={lstOfStcks} remove={removefromlst}/>
            </div>
            <div className="flex-child controlplane">
                <ControlPlane onChangeDuration={setDuration}/>
            </div>
        </div>
    )
}

export default index