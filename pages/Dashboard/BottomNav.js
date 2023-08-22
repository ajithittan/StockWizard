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
import {useSelector,useDispatch} from 'react-redux'
import {updDashboardLayout,SET_DASH_SECTOR,SET_SECTOR} from '../../redux/reducers/profileDashSlice'

const BottomNav = (props) => {
  const [value, setValue] = useState(0);
  const dispatch = useDispatch()

  const restoreDefault = () => {props.callBackSectorChange(null);dispatch(SET_DASH_SECTOR(0));dispatch(SET_SECTOR(false))}
  const addMoversToDashboard = () => setLayout({layoutId:1,compId:4})
  const addNewsToDashboard = () => setLayout({layoutId:1,compId:5})
  const {dashboardselsector} = useSelector((state) => state.dashboardlayout)

  const setLayout = async (item) => {dispatch(updDashboardLayout(item))}

  const updSelSector = async (sectorVal) => {
    props.callBackSectorChange(sectorVal)
    dispatch(SET_DASH_SECTOR(sectorVal.idstocksector))
  }

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
          <div style={{marginTop:"10px"}}><SectorDropDown selectedVal={dashboardselsector} callBackSectorChange={updSelSector}></SectorDropDown></div>
        </BottomNavigation>
      </Box>
    </Paper>  
  );
}

export default BottomNav