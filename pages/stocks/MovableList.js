import { useEffect,useState } from "react";
import {useAppSkinContext} from '../../modules/state/GlobalSkinState'
import { useRouter } from 'next/router'
import MovingAvg from './MovingAvg'
import AddPositions from './AddPositions'
import {DeleteStkFromPositions} from '../../modules/api/StockMaster'

const MovableList = (props) => {

    const [listofitems,setlistofitems] = useState(props.stockdetails)
    const [clicked,setClicked] = useState(false)
    const [skinVal,changeSkinVal] = useAppSkinContext()
    const router = useRouter()
    const [showTheDelete,setshowTheDelete] = useState(false)

    let dragged;
    let id;
    let index;
    let indexDrop;
    let list;

    useEffect(() =>{
        window.addEventListener("dragstart", dragstart);
        window.addEventListener("dragover", dragover);
        window.addEventListener("drop", drop);

        return () => {
            window.removeEventListener('dragstart', dragstart);
            window.removeEventListener('dragover', dragover);
            window.removeEventListener('drop', drop);
        };
    },[])

    /*
    useEffect(() => {
        const eventSource = new EventSource('/api/dashboard/realtime-price', { withCredentials: true });
        eventSource.onmessage = (e) => {
            let streamdt = e.data
            if (JSON.parse(streamdt).length > 0){
                setlistofitems(JSON.parse(streamdt))
            }
        }
      }, []);
      */

    const dragstart = ({target}) => {
        console.log("target-dragstart",target)
        dragged = target;
        id = target.id;
        list = target.parentNode.children;
        for(let i = 0; i < list.length; i += 1) {
            if(list[i] === dragged){
            index = i;
            }
        }
    }

    const dragover = (event) => {
        event.preventDefault();
    }

    const drop = ({target}) => {
        console.log("target-drop",target.id,id,target.className)
        if(target.className == "drpzone" && target.id !== id) {
            dragged.remove( dragged );
            for(let i = 0; i < list.length; i += 1) {
                if(list[i] === target){
                indexDrop = i;
                }
            }
            console.log(index, indexDrop);
            if(index > indexDrop) {
                target.before( dragged );
            } else {
            target.after( dragged );
            }
        }
    }

    const sortListPerChg = () =>{
        if (clicked){
            setlistofitems([...listofitems.sort((a,b) => Math.abs(a.perchange.toFixed(2)) - Math.abs(b.perchange.toFixed(2)))])
        }else{
            setlistofitems([...listofitems.sort((a,b) => Math.abs(b.perchange.toFixed(2)) - Math.abs(a.perchange.toFixed(2)))])
        }
        resetClk()
    }
    const sortsymbol = () =>{
        if (clicked){
            setlistofitems([...listofitems.sort((a,b) => a.symbol.localeCompare(b.symbol))])
        }else{
            setlistofitems([...listofitems.sort((a,b) => b.symbol.localeCompare(a.symbol))])
        }
        resetClk()
    }
    const resetClk = () =>{
        clicked ? setClicked(false) : setClicked(true)
    }
    const showPriceChart = (stk) =>{
        router.push({pathname: '/PriceCharts',query: {stock:stk}})
    }

    const deleteStkPos = async (stockSym) =>{
        let res = await DeleteStkFromPositions(stockSym)
        console.log("Stock to be deleted",stockSym,res)
        if (res){
            let temparr = [...listofitems]
            setlistofitems([...temparr.filter(item => item.symbol !==stockSym)])
        }
    }


    return(
            <div>
                <div style={{alignItems:"center", height:'40px',cursor:'grabbing',backgroundColor:'gray'}}>
                    <div className="Row"  style={{height:'25px',width:'100%',float:"right",backgroundColor:'white',zIndex:10,cursor:'auto'}}>
                        <div className={"Column DivHeader_" + skinVal.header} onClick={() => sortsymbol()}>Symbol <span style={{textalign:"left"}}><AddPositions /></span></div>
                        <div className={"Column DivHeader_" + skinVal.header} onClick={() => sortListPerChg()}>% Change</div>                        
                        <div className={"Column DivHeader_" + skinVal.header}>Close</div>
                        <div className={"Column DivHeader_" + skinVal.header}>50D Avg</div>
                        <div className={"Column DivHeader_" + skinVal.header}>200D Avg</div>
                        <div className={"Column DivHeader_" + skinVal.header}>Volume</div>
                        <div className={"Column DivHeader_" + skinVal.header}>10D Volume</div>
                        <div className={"Column DivHeader_" + skinVal.header}>3M Volume</div>
                    </div>
                </div>
                {
                    listofitems ? listofitems.map((item,index) => 
                        <div className="drpzone" id={index} draggable="true" style={{alignItems:"center", height:'25px',cursor:'grabbing',backgroundColor:'gray'}}>
                            <div className="Row" style={{height:'25px',width:'100%',float:"right",backgroundColor:'white',zIndex:10,cursor:'auto'}}>
                                <div className="Column" onMouseEnter={() => setshowTheDelete(true)} onMouseLeave={() => setshowTheDelete(false)}>
                                    <a href="#" onClick={() => showPriceChart(item.symbol)}>{item.symbol}</a>
                                    {
                                        showTheDelete ? <span title="Delete Position"><a href="#" style={{color:"red"}} onClick={() =>deleteStkPos(item.symbol)}>&nbsp;&nbsp;&#9003;</a></span> : null
                                    }
                                </div>
                                <div className="Column">{item.perchange.toFixed(2)}%</div>
                                <div className="Column">${item.close}</div>
                                <div className="Column"><MovingAvg symbol = {item.symbol} type={"SMA_50"}/></div>
                                <div className="Column"><MovingAvg symbol = {item.symbol} type={"SMA_200"}/></div>                                
                                <div className="Column">{item.volume.toLocaleString()}</div>
                                <div className="Column">{item.avgdayvol10day.toLocaleString()}</div>
                                <div className="Column">{item.avgdayvol3mon.toLocaleString()}</div>
                            </div>
                            
                        </div>
                    ):null
                }
            </div>
    )
   }

  export default MovableList