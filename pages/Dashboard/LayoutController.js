import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import { useSelector, useDispatch} from 'react-redux'
import {updDashboardLayout,SET_DASH_SECTOR,SET_SECTOR} from '../../redux/reducers/profileDashSlice'

const LayoutController = (props) =>{
    const dispatch = useDispatch()
    const {dashboardlayout,loading} = useSelector((state) => state.dashboardlayout)
    const setLayout = async (item) => {dispatch(updDashboardLayout(item))}
    const actions = [
        { icon: <ChangeCircleIcon onClick={() => setLayout({layoutId:2,compId:[2,3]})} disableRipple/>, name: 'Change' },
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
            sx={{...action.size}}
            />
        ))}
        </SpeedDial>
        </Box>

    )
}

export default LayoutController
