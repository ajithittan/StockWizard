import MultiLineChart from './MultiLineChart';
import ControlPlane from './ControlPlane'
import { useEffect, useState } from 'react';
import {useAppContext} from '../../modules/state/stockstate'
import getStockSector from '../../modules/cache/cachesector'

const index = () => {
    const defHeader = "My Positions"
    const stklist = useAppContext()
    const [fullList,setfullList] = useState(null)
    const [lstOfStcks,setlstOfStcks] = useState(null)
    const [duration,setDuration] = useState(6)
    const [header,setHeader] = useState(null)
    const [postions,setPostions] = useState(true)
    const [showAllSec, setshowAllSec] = useState(false)

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
        setlstOfStcks([...lstOfStcks.filter(item => String(item) !==stk)])
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
            setshowAllSec(false)
        }else{
            setPostions(false)
            setHeader(sector)
            setfullList(stocks)
            setlstOfStcks(stocks)
            setshowAllSec(false)
        }
    }

    const clickedSector = async () =>{
        let res = await getStockSector()
        setHeader("All Sectors")
        setPostions(false)
        setfullList(res.map(item => item.idstocksector))
        setlstOfStcks(res.map(item => item.idstocksector))
        setshowAllSec(true)
    }

    return (
        <div className="flex-container">
            <div className="flex-child main">
                <MultiLineChart key={duration+lstOfStcks + showAllSec} dur={duration} stocks={lstOfStcks} remove={removefromlst} keep={keepinlst} allSect={showAllSec}/>
            </div>
            <div className="flex-child controlplane">
                <ControlPlane key={fullList} key={lstOfStcks} header={header} pos={postions} onChangeDuration={setDuration} stocks={fullList} 
                    checked={lstOfStcks} remove={removefromlst} add={addTolst} onChangeSector={changeSector} clickedSector={clickedSector}/>
            </div>
        </div>
    )
}

export default index