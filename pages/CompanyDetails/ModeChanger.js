import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import PlusOneIcon from '@mui/icons-material/PlusOne';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import RemoveIcon from '@mui/icons-material/Remove';
import SaveIcon from '@mui/icons-material/Save';

const ModeChanger = (props) => {

  const actions = [
    { icon: <RotateRightIcon onClick={props.changePeriod}/>, name: 'A/Q' },
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

export default ModeChanger