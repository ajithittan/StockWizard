import MultiLineChart from './MultiLineChart';
import ControlPlane from './ControlPlane'
import { useEffect, useState } from 'react';
import {useAppContext} from '../../modules/state/stockstate'

const index = () => {
    const stklist = useAppContext()
    const [lstOfStcks,setlstOfStcks] = useState(null)
    const [duration,setDuration] = useState(6)

    useEffect(() =>{
        if (!lstOfStcks){
            setlstOfStcks(stklist)
        }
    },[stklist])

    const removefromlst = (stk) =>{
        setlstOfStcks([...lstOfStcks.filter(item => item !==stk)])
    }
    const keepinlst = (stk) =>{
        setlstOfStcks([stk])
    }
    const addTolst = (stk) =>{
        lstOfStcks.push(stk)
        setlstOfStcks([...lstOfStcks])
    }

    return (
        <div className="flex-container">
            <div className="flex-child main">
                <MultiLineChart key={duration+lstOfStcks} dur={duration} stocks={lstOfStcks} remove={removefromlst} keep={keepinlst}/>
            </div>
            <div className="flex-child controlplane">
                <ControlPlane key={stklist} key={lstOfStcks} onChangeDuration={setDuration} stocks={stklist} checked={lstOfStcks} remove={removefromlst} add={addTolst}/>
            </div>
        </div>
    )
}

export default index