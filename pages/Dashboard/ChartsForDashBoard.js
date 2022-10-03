import { useEffect, useState } from 'react'
import Charting from '../../components/Charting'
import {useAppContext} from '../../modules/state/stockstate'

const ChartsForDashBoard = (props) => {
    const stockList = useAppContext()

    return(
        <>
            <Charting stocks={stockList} duration={12} name="" callbacks={props.allCallBacks} />
        </>
    )
   }
  export default ChartsForDashBoard
