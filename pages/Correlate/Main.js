import { useEffect, useState } from 'react'
import ListStocks from './ListStocks'
import {getCorrelationsByPerChange} from '../../modules/api/StockPatterns'
import ForceSimulation from '../Charts/ForceSimulation'

const Main = (props) =>{
    const [showDefStks,setShowDefStks] = useState(props.showDefStks)
    const [listtocluster,setListtocluster] = useState([])
    const [clusterData,setClusterData] = useState(null)
    const [dur,setDur] = useState(20)

    useEffect(() =>{
        if(listtocluster.length > 2){
            fetchCorrls(listtocluster)
        }else{
            setClusterData(null)
        }
    },[listtocluster])

    const addtolist = (stk) => setListtocluster([...listtocluster, stk]);

    const fetchCorrls = async (stks) => {
        getCorrelationsByPerChange(stks,dur).then(retval => {
            if (retval){
                setClusterData(retval)
            }
        })
    }

    return (
        <>
        {
            showDefStks ? <ListStocks onselect={addtolist}></ListStocks> : null
        }
        {
            clusterData ? <ForceSimulation chartdata={clusterData}></ForceSimulation> : null
        }
        </>
    )
}

export default Main