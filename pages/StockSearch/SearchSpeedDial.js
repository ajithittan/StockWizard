import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import StreamIcon from '@mui/icons-material/Stream';
import {useDispatch} from 'react-redux'
import {STREAM_SEARCH} from '../../redux/reducers/stockSearchAdvSlice'

const SearchSpeedDial = (props) => {
  const dispatch = useDispatch()
  const actions = [
    { icon: <SavedSearchIcon onClick={() => {props.selected === "SQ" ? props.onselect(null):props.onselect("SQ")}}/>, name: 'Saved Search' },
    { icon: <ViewColumnIcon onClick={() => {props.selected === "COLS" ? props.onselect(null):props.onselect("COLS")}}/>, name: 'Add Columns' },
    { icon: <StreamIcon onClick={() => dispatch(STREAM_SEARCH())} /> }
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

export default SearchSpeedDial