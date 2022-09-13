import MultiLineChart from './MultiLineChart';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import {useAppContext} from '../../modules/state/stockstate'
import getStockSector from '../../modules/cache/cachesector'
import ModalBox from '../ModalBox'

const index = (props) => {
    const defHeader = "My Positions"
    const stklist = useAppContext()
    const [fullList,setfullList] = useState(null)
    const [lstOfStcks,setlstOfStcks] = useState(null)
    const [duration,setDuration] = useState(5)
    const [header,setHeader] = useState(null)
    const [postions,setPostions] = useState(true)
    const [showAllSec, setshowAllSec] = useState(false)
    const [labels,setLabels] = useState(null)
    const [allsecvals, setallsecvals] = useState(null)
    const router = useRouter()
    const [stocks,setStocks] = useState(null)
    const [showInModal,setShowInModal] = useState(false)

    const [width, setWidth]   = useState(null);
    const [height, setHeight] = useState(null);

    useEffect(() =>{
        if (!lstOfStcks){
            setlstOfStcks(stklist)
        }
        if (!fullList){
            setfullList(stklist)
        }
        setHeader(defHeader)
    },[stklist])

    useEffect(() =>{
        if (props.stocks ){setStocks(props.stocks)}
    },[props.stocks])

    useEffect(() =>{
        if (props.duration){
            setDuration(props.duration)
        }
    },[props.duration])

    const removefromlst = (stk) =>{
        setlstOfStcks([...lstOfStcks.filter(item => String(item) !== String(stk))])
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

    const openPrcChart = (stk) =>{
        if (showAllSec){
            changeSector(allsecvals.filter(item => String(item.idstocksector) === stk)[0].stocks,
                        allsecvals.filter(item => String(item.idstocksector) === stk)[0].sector)
        }
        else{
            router.push({pathname: '/Layout',query: {stock:stk,list:fullList}})
        }
    }

    const renderChart = (factor,modal) =>{
        if (modal){
        return (
            <MultiLineChart key={stocks+duration} dur={duration} stocks={stocks} remove={removefromlst} 
            indx={props.indx} keep={keepinlst} allSect={showAllSec} labels={labels} openPrcChart={openPrcChart} 
            name={props.name} openmodal={() => setShowInModal(true)} inModal={modal} dim={1000}/>    
        )}
        else{
            return (
            <MultiLineChart key={stocks+duration} dur={duration} stocks={stocks} remove={removefromlst} 
            indx={props.indx} keep={keepinlst} allSect={showAllSec} labels={labels} openPrcChart={openPrcChart} 
            name={props.name} openmodal={() => setShowInModal(true)} inModal={modal}/>    
        )
        }
    }

    return (
            <>
                {
                    showInModal ? <ModalBox content={renderChart(3.5,true)} onClose={() => setShowInModal(false)}></ModalBox> : renderChart(1,false) 
            
                }
            </>
    )
}

export default index