import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction'
import SpeedDialIcon from '@mui/material/SpeedDialIcon'
import RotateRightIcon from '@mui/icons-material/RotateRight';
import ShowChartIcon from '@mui/icons-material/ShowChart';

const ModeChanger = (props) => {

  const actions = [
    { icon: <RotateRightIcon onClick={() => props.changeAction("PERIOD")}/>, name: 'A/Q' },
    { icon: <ShowChartIcon onClick={() => props.changeAction("PRICECHART")}/>, name: 'Price Chart' },
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