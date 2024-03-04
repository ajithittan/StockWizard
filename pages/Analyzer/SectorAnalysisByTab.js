import { useEffect, useState } from "react"
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import StockPatterns from './StockPatterns'
import Grid from '@mui/material/Grid';
import {getCachedPatternsByDate} from '../../modules/cache/cachetopstockpatterns'
import WaitingForResonse from '../../components/WaitingForResponse'
import {useDispatch} from 'react-redux'
import {SET_DASH_STOCKS} from '../../redux/reducers/profileDashSlice'
import {initiateStreaming} from '../../modules/api/StockStream'
import StockQuotesLatest from '../../components/StockQuotesLatest'

const SectorAnalysisByTab = (props) => {
  const dispatch = useDispatch()
  const [datesOfPatterns,setDatesOfPatterns] = useState(null)
  const [patternByDate, setPatternByDate] = useState(null)
  const [value, setValue] = useState(null);
  const [getMoreInfo,setGetMoreInfo] = useState(false)

  useEffect(() =>{
    if(props.patterndates){
      setDatesOfPatterns(props.patterndates)
      setValue(props.patterndates[0]?.date)
      getPatterns(props.patterndates[0]?.date)
    }
  },[props.patterndates])

  const handleChange = (event, newValue) => {
    setPatternByDate(null)
    setValue(newValue);
    setGetMoreInfo(true)
    getPatterns(newValue)
  };

  const setStocksAndStream = async (stks) => {dispatch(SET_DASH_STOCKS(stks)),initiateStreaming(stks)}

  const getPatterns = async (inpdate) =>{
    const cacheKey = "PTRN_BY_DT_" + inpdate
    getCachedPatternsByDate(cacheKey,{date:inpdate}).then(retval => {
        if (retval.length > 0){
              setStocksAndStream(retval.map(item => item.symbol))
              setPatternByDate([...retval])
            }
        }
    )
  }

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange}>
            {
                datesOfPatterns?.map(pattern => <Tab label={pattern.date + "(" + pattern.patterncount + ")"} value={pattern.date} />)
            }
          </TabList>
        </Box>
        {
            patternByDate ? 
            <>
            <TabPanel value={value}>
                <Grid
                        container
                        direction="row"
                        justify="space-evenly"
                        align="stretch"
                        style={{height:"100%"}}
                    >
                    {
                        patternByDate.map(item => 
                                    <Grid xs={12} sm={12} md={6} lg={4} xl={4} >
                                      <StockPatterns key={item.stockpatterns} patterns={item.stockpatterns} expand={true} moreinfo={true}></StockPatterns>
                                    </Grid>) 
                    }
                </Grid>
            </TabPanel>
            <StockQuotesLatest stocks={patternByDate?.map(item=>item.symbol)}></StockQuotesLatest>
            </> : <WaitingForResonse/>
        }
      </TabContext>
    </Box>
  );
}

export default SectorAnalysisByTab