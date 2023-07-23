import { useEffect, useState } from 'react'
import getStockSector from '../../modules/cache/cachesector'
import Charting from '../../components/Charting'
import MainGrid from './MainGrid'
import ControlPanel from './ControlPanel'
import FloatController from '../../components/FloatController'
import cloneDeep from 'lodash/cloneDeep';
import SpeedDialControl from './SpeedDialControl'

const initDur = 3

const SectorPerformance = () =>{

    const [sector,setSector] = useState(null)
    const [chartItems,setchartItems] = useState(null)
    const [actContPanel,setactContPanel] = useState(false)
    const [initialSetUp,setinitialSetUp] = useState({duration:initDur})
    let [adjustitems,setAdjustItems] = useState(0)

    useEffect(() =>{
        if (!sector){
            getSectors()
        }
    },[])

    const getSectors = async () =>{
        await getStockSector().then(res => {
            if (res.length > 0){
                let tempcharitems = res.map((sector,indx) => <Charting stocks={sector.stocks} size={5} indx={indx} 
                                                                duration={initDur} name={sector.sector}/>)
                setSector(res)
                setchartItems(tempcharitems)
            }    
        })
    }

    const handleControlPanel = (value) =>{
        let key ="duration"
        let tempChng = {}
        tempChng[key] = parseInt(value)
        let tempitems = sector.map((sector,indx) => <Charting stocks={sector.stocks} size={5} indx={indx} 
                                    {...tempChng} name={sector.sector}/>)
        setchartItems([...tempitems])
        changeInitVals(key,value)
    }

    const getContentForControlPanel = () =>{
        return (<ControlPanel key={initialSetUp} onChanges={handleControlPanel} initialsetup={initialSetUp}></ControlPanel>)
    }

    const changeInitVals = (tp,val) =>{
        const tempinit = cloneDeep(initialSetUp)
        tempinit[tp] = val
        setinitialSetUp({...tempinit})
    }

    const adjustMonthToDur = (adjVal) => {
        let key = "duration"
        let newdur = parseInt(initialSetUp.duration) + adjVal
        if (newdur >= 1){
            let tempChng = {}
            tempChng[key] = newdur
            let tempitems = sector.map((sector,indx) => <Charting stocks={sector.stocks} size={5} indx={indx} 
                                        {...tempChng} name={sector.sector}/>)
            setchartItems([...tempitems])
            changeInitVals(key,newdur)    
        }
    }

    const cropAction = () => adjustitems >= 12 ? null : setAdjustItems(adjustitems + 0.2)

    return(
        <> 
          <title>Sector Performance</title>
          {/*
          <FloatController content={getContentForControlPanel()}></FloatController>
             <div style={{display:actContPanel? "block" : "none"}}>
                    <ControlPanel key={initialSetUp} onChanges={handleControlPanel} initialsetup={initialSetUp} onChanges={changeInitVals}></ControlPanel>
            </div>   
           */}
          <div onClick={() => setactContPanel(false)} style={{margin:"25px"}}>
                <MainGrid key={chartItems+adjustitems} items = {chartItems} adjust={adjustitems}/>
          </div>
          <SpeedDialControl initDur={initialSetUp?.duration} handleDurChanges={handleControlPanel} 
                        initialState={initialSetUp} addAction={adjustMonthToDur} reduceOne={adjustMonthToDur}
                        cropAction={cropAction}>
          </SpeedDialControl>
        </>
    )
    
}

export default SectorPerformance