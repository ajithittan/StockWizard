import { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Paper from '@mui/material/Paper';
import SectorDropDown from '../../components/SectorDropDown'

const BottomNav = (props) => {
  const [value, setValue] = useState(0);

  const restoreDefault = () => props.callBackSectorChange(null)

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
          <div style={{marginTop:"10px"}}><SectorDropDown callBackSectorChange={props.callBackSectorChange}></SectorDropDown></div>
        </BottomNavigation>
      </Box>
    </Paper>  
  );
}

export default BottomNav