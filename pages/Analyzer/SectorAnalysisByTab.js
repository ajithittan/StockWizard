import { useState } from "react"
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import StockPatterns from './StockPatterns'
import Grid from '@mui/material/Grid';

const SectorAnalysisByTab = (props) => {
  const [patternByDate, setPatternByDate] = useState(props.patterns)
  const [value, setValue] = useState(null);
  const [getMoreInfo,setGetMoreInfo] = useState(false)

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setGetMoreInfo(true)
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            {
                patternByDate?.map(pattern => <Tab label={pattern.date} value={pattern.date} />)
            }
          </TabList>
        </Box>
        {
            patternByDate?.map(pattern => 
            <TabPanel value={pattern.date}>
                <Grid
                        container
                        direction="row"
                        justify="space-evenly"
                        align="stretch"
                        style={{height:"100%"}}
                    >
                    {
    
                        pattern.patterns?.map(item => <Grid xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <StockPatterns patterns={item.stockpatterns} expand={true} moreinfo={getMoreInfo}></StockPatterns>
                                    </Grid>) 
                    }
                </Grid>
            </TabPanel>
            )
        }
      </TabContext>
    </Box>
  );
}

export default SectorAnalysisByTab