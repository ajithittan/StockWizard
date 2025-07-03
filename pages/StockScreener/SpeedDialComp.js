import { useState } from 'react'
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import {useDispatch} from 'react-redux'
import {UPD_ROW_COUNTS,UPD_DISP_SETTINGS} from '../../redux/reducers/stockScreenerSlice'


const SpeedDialControl = (props) => {

  const [value, setValue] = useState(0);
  const [rowCnt,setRowCnt] = useState([10,50,100,200,300,500,1000])
  const dispatch = useDispatch()

  const handleChange = (inpval) => dispatch(UPD_ROW_COUNTS(inpval.target.value))
  const handleShowAll = () => dispatch(UPD_DISP_SETTINGS({"showMainContainer":true}))

  const DropDown = () => {
    return (
      <Select
        size="small"
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        //value={props.selectedVal}
        onChange={handleChange}
        >
        {
            rowCnt ? rowCnt.map(item => <MenuItem value={item}>{item}</MenuItem>) : null
        }
      </Select>
    )
  }

  const actions = [
    { icon: <DropDown/>, name: 'Rows' , size:{width: 55} },
    { icon: <RestartAltIcon onClick={handleShowAll}/>, name: 'ShowAll' ,  }
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