import { useState } from 'react'
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import ListIcon from '@mui/icons-material/List';
import {useDispatch} from 'react-redux'
import {UPD_ROW_COUNTS} from '../../redux/reducers/stockScreenerSlice'
import Notification from './Notification'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const BottomNav = (props) => {
  const [value, setValue] = useState(0);
  const [rowCnt,setRowCnt] = useState([200,300,500,1000])
  const dispatch = useDispatch()

  const handleChange = (inpval) => dispatch(UPD_ROW_COUNTS(inpval.target.value))

  return (
      <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, maxWidth:"98%" }}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <div style={{marginTop:"10px"}}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Rows</InputLabel>
              <Select
                size="small"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                //value={props.selectedVal}
                label="Row Count"
                onChange={handleChange}
                >
                {
                    rowCnt ? rowCnt.map(item => <MenuItem value={item}>{item}</MenuItem>) : null
                }
              </Select>
            </FormControl>
          </div>
        </BottomNavigation>
      </Box>
  );
}

export default BottomNav