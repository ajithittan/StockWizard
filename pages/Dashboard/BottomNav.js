import { useState } from 'react'
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import SectorDropDown from '../../components/SectorDropDown'
import {useSelector,useDispatch} from 'react-redux'
import {SET_DASH_SECTOR,SET_SECTOR,SET_DASH_STOCKS} from '../../redux/reducers/profileDashSlice'

const BottomNav = (props) => {
  const [value, setValue] = useState(0);
  const dispatch = useDispatch()

  const restoreDefault = () => {
    dispatch(SET_DASH_SECTOR(0));
    dispatch(SET_SECTOR(false));
    dispatch(SET_DASH_STOCKS(null))
  }

  const {dashboardselsector} = useSelector((state) => state.dashboardlayout)

  const updSelSector = async (sectorVal) => {
    dispatch(SET_DASH_STOCKS(sectorVal.stocks))
    dispatch(SET_DASH_SECTOR(sectorVal.idstocksector))
    dispatch(SET_SECTOR(true))
  }

  return (
      <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="My Stocks" icon={<RestoreIcon />} onClick={restoreDefault}/>
          <div style={{marginTop:"10px"}}><SectorDropDown selectedVal={dashboardselsector} callBackSectorChange={updSelSector}></SectorDropDown></div>
        </BottomNavigation>
      </Box>
  );
}

export default BottomNav