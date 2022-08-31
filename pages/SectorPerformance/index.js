import { useEffect, useState } from 'react'
import getStockSector from '../../modules/cache/cachesector'
import Charting from '../../components/Charting'
import MainGrid from '../Containers'
import ControlPanel from './ControlPanel'

const initDur = 3

const SectorPerformance = () =>{

    const [sector,setSector] = useState(null)
    const [chartItems,setchartItems] = useState(null)
    const [controlPanel,setControlPanel] = useState(null)
    const [initialSetUp,setinitialSetUp] = useState({duration:initDur})

    useEffect(() =>{
        if (!sector){
            getSectors()
        }
    },[])

    const getSectors = async () =>{
        let res = await getStockSector()
        console.log("res",res)
        let tempcharitems = res.map((sector,indx) => <Charting stocks={sector.stocks} size={3} indx={indx} 
                                    duration={initDur} name={sector.sector}/>)
        setSector(res)
        setchartItems(tempcharitems)
    }

    const handleControlPanel = (key,value) =>{
        let tempChng = {}
        tempChng[key] = value
        console.log(tempChng)
        let tempitems = sector.map((sector,indx) => <Charting stocks={sector.stocks} size={3} indx={indx} 
                                    {...tempChng} name={sector.sector}/>)
        setchartItems([...tempitems])
    }

    return(
        <> 
          <ControlPanel key={initialSetUp} onChanges={handleControlPanel} initialsetup={initialSetUp}></ControlPanel>   
          <MainGrid key={chartItems} items = {chartItems} size={3}/>
        </>
    )
    
}

export default SectorPerformance