import MainScreenerContainer from './MainScreenerContainer'
import SpeedDialComp from './SpeedDialComp'
import StreamScreenerData from './StreamScreenerData'
import {useSelector} from 'react-redux'

const index = () => {

  const {streamstocks} = useSelector(state => state.stockscreener)
  console.log("stocks to strem - ",streamstocks)

  return (
    <>
      <StreamScreenerData key={streamstocks} url={'/stream/intradaystkptrns/100/1?inpdata=' + JSON.stringify(streamstocks)} inpdata={streamstocks}></StreamScreenerData>
      <MainScreenerContainer />
      <SpeedDialComp></SpeedDialComp>
    </>
  );
}

export default index
