import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import BarChartIcon from '@mui/icons-material/BarChart';
import FeedIcon from '@mui/icons-material/Feed';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import {useDispatch} from 'react-redux'
import {updDashboardLayout} from '../../redux/reducers/profileDashSlice'

const SpeedDialComp = (props) => {

  const dispatch = useDispatch()

  const addMoversToDashboard = () => setLayout({layoutId:1,compId:4})
  const addNewsToDashboard = () => setLayout({layoutId:1,compId:5})
  const addChartsToDashboard = () => setLayout({layoutId:1,compId:1})
  const addIdeasToDashboard = () => setLayout({layoutId:1,compId:1})
  const setLayout = async (item) => {dispatch(updDashboardLayout(item))}

  const actions = [
    { icon: <WhatshotIcon onClick={addMoversToDashboard}/>, name: 'Whats Hot' },
    { icon: <FeedIcon onClick={addNewsToDashboard}/>, name: 'News' },
    { icon: <BarChartIcon onClick={addChartsToDashboard}/>, name: 'Performance' },
    { icon: <LightbulbIcon onClick={addIdeasToDashboard}/>, name: 'Ideas' },
  ];
  
  return (
    <Box sx={{ position: 'relative', mt: 2, height: 320 }}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'fixed', bottom: 16, left: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}

export default SpeedDialComp