import { useEffect,useState } from "react"
import Charting from '../../components/Charting'
import {useAppContext} from '../../modules/state/stockstate'
import MainGrid from '../Containers'

const ChartsForDashBoard = (props) => {
    const stockList = useAppContext()

    console.log("whats this? ",stockList)

    const getChartItems = () => {
        if(stockList){
            return([<Charting stocks={stockList} size={7} indx={1} duration={12} name="" />])
        }
    }

    return(
        <>
            <MainGrid items = {getChartItems()} size={7}/>
        </>
    )
   }
  export default ChartsForDashBoard
