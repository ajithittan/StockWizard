import { useEffect,useState } from "react";
import {useAppSkinContext} from '../../modules/state/GlobalSkinState'

const MovableList = (props) => {

    const [listofitems,setlistofitems] = useState(props.stockdetails)
    const [clicked,setClicked] = useState(false)
    const [skinVal,changeSkinVal] = useAppSkinContext()

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

    return(
            <div>
                <div style={{alignItems:"center", height:'40px',cursor:'grabbing',backgroundColor:'gray'}}>
                    <div className="Row"  style={{height:'40px',width:'97%',float:"right",backgroundColor:'white',zIndex:10,cursor:'auto'}}>
                        <div className={"Column DivHeader_" + skinVal.header} onClick={() => sortsymbol()}>Symbol</div>
                        <div className={"Column DivHeader_" + skinVal.header}>Close</div>
                        <div className={"Column DivHeader_" + skinVal.header} onClick={() => sortListPerChg()}>% Change</div>
                        <div className={"Column DivHeader_" + skinVal.header}>Volume</div>
                        <div className={"Column DivHeader_" + skinVal.header}>10D Volume</div>
                        <div className={"Column DivHeader_" + skinVal.header}>3M Volume</div>
                    </div>
                </div>
                {
                    console.log("listofitems",listofitems),
                    listofitems ? listofitems.map((item,index) => 
                        <div className="drpzone" id={index} draggable="true" style={{alignItems:"center", height:'40px',cursor:'grabbing',backgroundColor:'gray'}}>
                            <div className="Row" style={{height:'40px',width:'97%',float:"right",backgroundColor:'white',zIndex:10,cursor:'auto'}}>
                                <div className="Column"><a href="#">{item.symbol}</a></div>
                                <div className="Column">${item.close}</div>
                                <div className="Column">{item.perchange.toFixed(2)}%</div>
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