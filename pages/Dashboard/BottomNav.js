import { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FeedIcon from '@mui/icons-material/Feed';
import Paper from '@mui/material/Paper';
import SectorDropDown from '../../components/SectorDropDown'
import AddToHomeScreenIcon from '@mui/icons-material/AddToHomeScreen';
import WhatshotIcon from '@mui/icons-material/Whatshot';

const BottomNav = (props) => {
  const [value, setValue] = useState(0);

  const restoreDefault = () => props.callBackSectorChange(null)
  const addMoversToDashboard = () => props.callBackToAddMovers(1,4)
  const addNewsToDashboard = () => props.callBackToAddMovers(1,5)

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <Box>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="My Stocks" icon={<RestoreIcon />} onClick={restoreDefault}/>
          <BottomNavigationAction label="Add Movers" icon={<WhatshotIcon />} onClick={addMoversToDashboard}/>
          <BottomNavigationAction label="Add News" icon={<FeedIcon />} onClick={addNewsToDashboard}/>
          <div style={{marginTop:"10px"}}><SectorDropDown callBackSectorChange={props.callBackSectorChange}></SectorDropDown></div>
        </BottomNavigation>
      </Box>
    </Paper>  
  );
}

export default BottomNav