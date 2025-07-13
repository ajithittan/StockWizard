import MainScreenerContainer from './MainScreenerContainer'
import SpeedDialComp from './SpeedDialComp'
import StreamScreenerData from './StreamScreenerData'
import {useSelector} from 'react-redux'
import {ADD_STK_CHART_POINTS} from '../../redux/reducers/stockScreenerSlice'
import {UPDATED_CHART_DATA} from '../../redux/reducers/chartDataSlice'

const index = () => {

  const {streamstocks} = useSelector(state => state.stockscreener)
  //console.log("stocks to streamstocks - ",streamstocks)

  return (
    <>
      <StreamScreenerData key={streamstocks} url={'/stream/intradaystkptrns/20/1?inpdata=' + JSON.stringify(streamstocks)} inpdata={streamstocks} streamout={ADD_STK_CHART_POINTS}></StreamScreenerData>
      <StreamScreenerData key={streamstocks} url={'/stream/stocktick/1/1?inpdata=' + JSON.stringify(streamstocks)} inpdata={streamstocks} streamout={UPDATED_CHART_DATA}></StreamScreenerData>
      <MainScreenerContainer />
      <SpeedDialComp></SpeedDialComp>
    </>
  );
}

export default index
