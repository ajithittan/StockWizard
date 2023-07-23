import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import PlusOneIcon from '@mui/icons-material/PlusOne';
import CropIcon from '@mui/icons-material/Crop';
import RemoveIcon from '@mui/icons-material/Remove';
import SaveIcon from '@mui/icons-material/Save';
import Duration from '../../components/Duration'

const SpeedDialControl = (props) => {

  const actions = [
    { icon: <Duration changedval={props.handleDurChanges} dur={props.initDur}/>, name: 'Save' , size:{width: 55} },
    { icon: <PlusOneIcon onClick={() => props.addAction(1)} disableRipple/>, name: 'Add Month' },
    { icon: <RemoveIcon onClick={() => props.reduceOne(-1)}/>, name: 'Remove Month' },
    { icon: <CropIcon onClick={props.cropAction}/>, name: 'Crop' },
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
  );
}

export default SpeedDialControl