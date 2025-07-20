import { useEffect} from 'react'
import MainScreenerContainer from './MainScreenerContainer'
import SpeedDialComp from './SpeedDialComp'
import StreamScreenerData from './StreamScreenerData'
import {useSelector,useDispatch} from 'react-redux'
import {ADD_STK_CHART_POINTS} from '../../redux/reducers/stockScreenerSlice'
import {UPDATED_CHART_DATA} from '../../redux/reducers/chartDataSlice'
import {SET_DASH_SLIDER_DUR,UPD_DASH_OPTIONS} from '../../redux/reducers/profileDashSlice'
import {Box} from '@mui/material';


const index = () => {
  const dispatch = useDispatch()
  const {streamstocks} = useSelector(state => state.stockscreener)

  useEffect(() =>{
    //this is to ensure everytime this page loads, it opens today's chart
    dispatch(SET_DASH_SLIDER_DUR({type:"D",val:1}))
    dispatch(UPD_DASH_OPTIONS({addstks:false}))
  },[])
  //console.log("stocks to streamstocks - ",streamstocks)

  return (
      <Box sx={{
        margin:"1vh",
        borderRadius: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <StreamScreenerData key={streamstocks} url={'/stream/intradaystkptrns/20/1?inpdata=' + JSON.stringify(streamstocks)} inpdata={streamstocks} streamout={ADD_STK_CHART_POINTS}></StreamScreenerData>
        <StreamScreenerData key={streamstocks} url={'/stream/stocktick/1/1?inpdata=' + JSON.stringify(streamstocks)} inpdata={streamstocks} streamout={UPDATED_CHART_DATA}></StreamScreenerData>
        <MainScreenerContainer />
        <SpeedDialComp></SpeedDialComp>
    </Box>
  );
}

export default index
