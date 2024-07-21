import { useEffect, useState } from 'react'
import ListStocks from './ListStocks'
import ListExtSectors from './ListExtSectors'
import {getCorrelationsByPerChange} from '../../modules/api/StockPatterns'
import ForceSimulation from '../Charts/ForceSimulation'
import ListView from './ListView'
import WaitingForResonse from '../../components/WaitingForResponse'
import Grid from '@mui/material/Grid';
import RealtimeAnalysis from './RealtimeAnalysis'

const Main = (props) =>{
    const [showDefStks,setShowDefStks] = useState(props.showDefStks)
    const [showAnalyzer,setShowAnalyzer] = useState(null)    
    const [listtocluster,setListtocluster] = useState([])
    const [clusterData,setClusterData] = useState(null)
    const [dur,setDur] = useState(5)
    //bubblecht as type to populate bubble chart
    const [mode,setMode] = useState("default")

    useEffect(() =>{
        if(listtocluster.length > 2){
            fetchCorrls(listtocluster)
        }else{
            setClusterData(null)
        }
    },[listtocluster])

    const addtolist = (stk) => setListtocluster([...new Set([...listtocluster, stk])]);

    const addSectStkstoList = (stks) => setListtocluster([...new Set([...stks])]);

    const fetchCorrls = async (stks) => {
        getCorrelationsByPerChange(stks,dur,mode).then(retval => {
            if (retval){
                setClusterData(retval)
            }
        })
    }

    return (
        <Grid container layout={'row'} margin={1}>        
            {/** <ListStocks onselect={addtolist}></ListStocks>**/}
            {
            showDefStks ? <Grid item xs={12}> <ListExtSectors onselect={addSectStkstoList}></ListExtSectors><ListStocks onselect={addtolist}></ListStocks></Grid> : null
            }            
            {
                //clusterData ? <ForceSimulation chartdata={clusterData}></ForceSimulation> : null
                clusterData ? 
                    <Grid item xs={11} sm={11} md={2} lg={2} xl={2} margin={0.5} marginTop={2}>
                        <ListView key={clusterData} inputvals={clusterData} onselect={setShowAnalyzer}></ListView>
                    </Grid>: <WaitingForResonse />
            }
            {
                showAnalyzer ? 
                <Grid xs={11} sm={11} md={9} lg={9} xl={9} margin={0.5} marginTop={2}>
                    <RealtimeAnalysis stocks={showAnalyzer?.map(item => item.stock)}></RealtimeAnalysis>
                </Grid>: null
            }
        </Grid>
    )
}

export default Main