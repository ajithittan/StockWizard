import MultiLineChart from './MultiLineChart';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import {useAppContext} from '../../modules/state/stockstate'
import getStockSector from '../../modules/cache/cachesector'

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
    const [expandSec, setExpandSec] = useState(false)
    const [allsecvals, setallsecvals] = useState(null)
    const router = useRouter()
    const [stocks,setStocks] = useState(null)

    const [width, setWidth]   = useState(null);
    const [height, setHeight] = useState(null);

    useEffect(() =>{
        updateDimensions()
    },[props.size])

    const updateDimensions = () => {
        if (props.size){
            setWidth(window.innerWidth*(props.size/12));
            setHeight(window.innerHeight*(props.size/12));    
        }
    }
    useEffect(() => {
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

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

    const clickedAllSector = async () =>{
        let res = await getStockSector()
        setallsecvals(res)
        setHeader("All Sectors")
        setPostions(false)
        setExpandSec(false)
        setfullList(res.map(item => item.sector))
        setlstOfStcks(res.map(item => item.sector))
        setLabels(res.map(item => ({"id":item.idstocksector,"desc":item.sector})))
        setshowAllSec(true)
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

    return (
        <div className="flex-container">
            <div className="flex-child main">
                {
                    <MultiLineChart key={stocks+duration} dur={duration} stocks={stocks} remove={removefromlst} indx={props.indx} 
                            keep={keepinlst} allSect={showAllSec} labels={labels} openPrcChart={openPrcChart} width={width} 
                            height={height} name={props.name}/>
            
                }
            </div>
        </div>
    )
}

export default index