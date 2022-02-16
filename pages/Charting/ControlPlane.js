import { useState } from 'react'
import ListingOfStocks from './Components/ListingOfStocks'
import SectorStocks from './Components/SectorStocks'
const ControlPlane = (props) =>{
    
    return(
            <>
            <select className="Duration" id="Duration" onChange={e => props.onChangeDuration(e.target.value)}>
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
                        <span className="headerListStocks">All Sectors</span>
                </div> </> : null
    
            }
            {
                props.pos === false ?  <> <div style={{padding:'5px'}}></div>
                <div className="listStocks" onClick={() => props.onChangeSector(null,0)}>
                        <span className="headerListStocks">My positions</span>
                </div> </> : null
    
            }
            <> <div style={{padding:'5px'}}></div>
            <div className="flex-container_control" style={{paddingTop:'5px'}}>
                <SectorStocks onChangeSector={props.onChangeSector} pos={props.pos} header={props.header}/>
            </div>
            </>
        </div>
        </>
    )
}
export default ControlPlane