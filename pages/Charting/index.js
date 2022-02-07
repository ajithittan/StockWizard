import MultiLineChart from './MultiLineChart';
import ControlPlane from './ControlPlane'
import { useEffect, useState } from 'react';
import {useAppContext} from '../../modules/state/stockstate'

const index = () => {
    const defHeader = "My Positions"
    const stklist = useAppContext()
    const [fullList,setfullList] = useState(null)
    const [lstOfStcks,setlstOfStcks] = useState(null)
    const [duration,setDuration] = useState(6)
    const [header,setHeader] = useState(null)
    const [postions,setPostions] = useState(true)

    useEffect(() =>{
        if (!lstOfStcks){
            setlstOfStcks(stklist)
        }
        if (!fullList){
            setfullList(stklist)
        }
        setHeader(defHeader)
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
    const changeSector = (stocks,sector) =>{
        if (sector === 0){
            setPostions(true)
            setHeader(defHeader)
            setfullList(stklist)
            setlstOfStcks(stklist)
        }else{
            setPostions(false)
            setHeader(sector)
            setfullList(stocks)
            setlstOfStcks(stocks)
        }
    }

    return (
        <div className="flex-container">
            <div className="flex-child main">
                <MultiLineChart key={duration+lstOfStcks} dur={duration} stocks={lstOfStcks} remove={removefromlst} keep={keepinlst}/>
            </div>
            <div className="flex-child controlplane">
                <ControlPlane key={fullList} key={lstOfStcks} header={header} pos={postions} onChangeDuration={setDuration} stocks={fullList} checked={lstOfStcks} remove={removefromlst} add={addTolst} onChangeSector={changeSector}/>
            </div>
        </div>
    )
}

export default index