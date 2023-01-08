import { useEffect, useState } from 'react'
import Charting from '../../components/Charting'
import {useAppContext} from '../../modules/state/stockstate'
import AddPositions from '../stocks/AddPositions'

const ChartsForDashBoard = (props) => {
    const stockList = useAppContext()

    return(
        <>
            {stockList && stockList.length > 0 ? <Charting stocks={stockList} duration={12} name="" callbacks={props.allCallBacks} /> : <AddPositions></AddPositions>}
        </>
    )
   }
  export default ChartsForDashBoard
