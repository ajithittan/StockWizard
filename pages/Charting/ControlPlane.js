import { useState } from 'react'
import ListingOfStocks from './Components/ListingOfStocks'
import SectorStocks from './Components/SectorStocks'
const ControlPlane = (props) =>{

    const clickedList = () => {
        console.log("clicked?")
        props.onChangeSector(null,0)
        props.expSec(false)
    }
    
    return(
            <>
            <select className="Duration" id="Duration" onChange={e => props.onChangeDuration(e.target.value)} value={props.dur}>
                <option value="3">3</option>
                <option value="6">6</option>
                <option value="12">12</option>
                <option value="24">24</option>
                <option value="36">36</option>
                <option value="48">48</option>
                <option value="60">60</option>
                <option value="72">72</option>
                <option value="84">84</option>
                <option value="96">96</option>
                <option value="108">108</option>
                <option value="120">120</option>
            </select>
            <div style={{overflow: 'auto',height:'90%'}}>
            <div style={{padding:'5px'}}></div>
            <div className="listStocks">
                <span className="headerListStocks">{props.header}</span>
                <div className="flex-container_control">
                    <ListingOfStocks stocks={props.stocks} remove={props.remove} add={props.add} checked={props.checked}/>
                </div>
            </div>
            {
                props.allsectors === false ?  <> <div style={{padding:'5px'}}></div>
                <div className="listStocks" onClick={props.clickedSector}>
                        <span className="headerListStocks">Plot All Sectors</span>
                </div> </> : null
    
            }
            {
                props.pos === false ?  <> <div style={{padding:'5px'}}></div>
                <div className="listStocks" onClick={() => clickedList()}>
                        <span className="headerListStocks">Plot My positions</span>
                </div> </> : null
    
            }
            <> <div style={{padding:'5px'}}></div>
            <div className="flex-container_control" >
            {
                props.exp ? <SectorStocks onChangeSector={props.onChangeSector} pos={props.pos} header={props.header}/>: 
                        <div className="listStocks" onClick={() => props.expSec(true)}>
                            <span className="headerListStocks">Expand Sectors</span>
                        </div>
            }
            </div>
            </>
        </div>
        </>
    )
}
export default ControlPlane