import { useEffect, useState } from 'react'
import getStockSector from '../../modules/cache/cachesector'
import Charting from '../../components/Charting'
import MainGrid from '../Containers'
import ControlPanel from './ControlPanel'
import FloatController from '../../components/FloatController'
import cloneDeep from 'lodash/cloneDeep';

const initDur = 3

const SectorPerformance = () =>{

    const [sector,setSector] = useState(null)
    const [chartItems,setchartItems] = useState(null)
    const [actContPanel,setactContPanel] = useState(false)
    const [initialSetUp,setinitialSetUp] = useState({duration:initDur})
    const styleOfControlPanel = {padding:"10px"}

    useEffect(() =>{
        if (!sector){
            getSectors()
        }
    },[])

    const getSectors = async () =>{
        let res = await getStockSector()
        console.log("res",res)
        if (res.length > 0){
            let tempcharitems = res.map((sector,indx) => <Charting stocks={sector.stocks} size={5} indx={indx} 
                                duration={initDur} name={sector.sector}/>)
            setSector(res)
            setchartItems(tempcharitems)
        }
    }

    const handleControlPanel = (key,value) =>{
        let tempChng = {}
        tempChng[key] = value
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

    return(
        <> 
          <title>Sector Performance</title>
          <FloatController content={getContentForControlPanel()}></FloatController>
          <div style={{display:actContPanel? "block" : "none"}}>
                <ControlPanel key={initialSetUp} onChanges={handleControlPanel} initialsetup={initialSetUp} onChanges={changeInitVals}></ControlPanel>
          </div>   
          <div onClick={() => setactContPanel(false)}>
                <MainGrid key={chartItems} items = {chartItems}/>
          </div>
        </>
    )
    
}

export default SectorPerformance