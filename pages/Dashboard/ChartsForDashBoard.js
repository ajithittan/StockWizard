import { useEffect, useState } from 'react'
import Charting from '../../components/Charting'
import {useAppContext} from '../../modules/state/stockstate'
import AddPositions from '../stocks/AddPositions'

const ChartsForDashBoard = (props) => {
    const stockList = useAppContext()
    const [duration,setDuration] = useState(null)

    useEffect(() =>{
        if(props.dur){
            setDuration(props.dur)
        }
    },[])

    return(
        <>
            {stockList && stockList.length > 0 ? <Charting stocks={stockList} duration={duration} name="" callbacks={props.allCallBacks} /> : <AddPositions></AddPositions>}
        </>
    )
   }
  export default ChartsForDashBoard
