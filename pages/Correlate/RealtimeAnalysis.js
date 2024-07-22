import { useEffect, useState } from 'react'
import ListViewAnalysis from './ListViewAnalysis'
import StreamStockPrice from '../../components/StreamStockPrice'
import {initiateStreaming} from '../../modules/api/StockStream'

//This function dispatches all the stocks that need to be streamed. The children of this function will select from redux all 
//streamed quotes.

const RealtimeAnalysis = (props) =>{
    const [dispType,setDispType] = useState("LIST")

    useEffect(() =>{
        if(props.stocks){
            initiateStreaming(props.stocks)
        }
    },[props.stocks])

    const getComponentTypeToDisplay = () =>{
        const typesOfDisp = {"LIST":<ListViewAnalysis stocks={props.stocks}/>}
        return typesOfDisp[dispType]
    }
 
    return (
        <>
            {getComponentTypeToDisplay()}
            <StreamStockPrice></StreamStockPrice>
        </>
    )
}

export default RealtimeAnalysis