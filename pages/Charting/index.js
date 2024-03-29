import MultiLineChart from './MultiLineChart';
import ControlPlane from './ControlPlane'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import getStockSector from '../../modules/cache/cachesector'
import myGif from "../../public/loading-loading-forever.gif"
import Image from 'next/image';
import { useSelector} from 'react-redux'

const index = () => {
    const defHeader = "My Positions"
    const {stockList} = useSelector((state) => state.porfoliostock)
    const [fullList,setfullList] = useState(null)
    const [lstOfStcks,setlstOfStcks] = useState(null)
    const [duration,setDuration] = useState(3)
    const [header,setHeader] = useState(null)
    const [postions,setPostions] = useState(true)
    const [showAllSec, setshowAllSec] = useState(false)
    const [labels,setLabels] = useState(null)
    const [expandSec, setExpandSec] = useState(false)
    const [allsecvals, setallsecvals] = useState(null)
    const router = useRouter()
    const [showContent,setshowContent] = useState(false)
    const [width, setWidth]   = useState(null);
    const [height, setHeight] = useState(null);
    const [wait,setWait] = useState(false)

    useEffect(() =>{
        if (!lstOfStcks){
            setlstOfStcks(stockList)
        }
        if (!fullList){
            setfullList(stockList)
        }
        setHeader(defHeader)
    },[stockList])

    useEffect(() =>{
        setWidth(window.innerWidth*0.90)
        setHeight(window.innerHeight*0.90)
    },[])

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
            setfullList(stockList)
            setlstOfStcks(stockList)
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
        setWait(true)
        //setfullList(null)
        //setlstOfStcks(null)
        let res = await getStockSector()
        setshowAllSec(true)        
        setallsecvals(res)
        setHeader("All Sectors")
        setPostions(false)
        setExpandSec(false)
        setfullList(res.map(item => item.sector))
        setlstOfStcks(res.map(item => item.sector))
        setLabels(res.map(item => ({"id":item.idstocksector,"desc":item.sector})))
        setWait(false)
    }

    const openPrcChart = (stk) =>{
        if (showAllSec){
            changeSector(allsecvals.filter(item => String(item.idstocksector) === stk)[0].stocks,
                        allsecvals.filter(item => String(item.idstocksector) === stk)[0].sector)
        }
        else{
            router.push({pathname: '/PriceCharts',query: {stock:stk,dur:duration,list:fullList}})
        }
    }

    return (
        <>
            <div className="flex-container">
                <title>Performance</title>
                <div>
                    {wait ? <Image src={myGif} alt="wait" height={300} width={300} /> : <MultiLineChart key={duration+showAllSec+lstOfStcks+labels}  dur={duration} stocks={lstOfStcks} 
                            remove={removefromlst} keep={keepinlst} allSect={showAllSec} labels={labels} 
                            openPrcChart={openPrcChart} width={width} height={height}/>
                    }        
                </div>
                <div className= "Controlpanel" onMouseEnter={() => setshowContent(true)} onMouseLeave={() => setshowContent(false)}>
                {
                    showContent ? 
                                    <ControlPlane key={fullList} key={lstOfStcks} header={header} pos={postions} onChangeDuration={setDuration} stocks={fullList} 
                                        checked={lstOfStcks} remove={removefromlst} add={addTolst} onChangeSector={changeSector} 
                                        clickedSector={clickedAllSector} allsectors={showAllSec} dur={duration} exp={expandSec} expSec={setExpandSec}/>
                                : null
                }
            </div>

            </div>
        </>
    )
}

export default index