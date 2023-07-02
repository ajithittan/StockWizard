import { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import getStockSector from '../modules/cache/cachesector'

const SectorDropDown = (props) =>{

    const [sectors, setSectors] = useState(null);
    const [selSec,setSelSec] = useState(null)

    useEffect(() =>{
        if (!selSec){
            getStockSector().then(res =>{
                if (res && res.length > 0){
                    setSectors(res.sort((a,b) => a.sector.toLowerCase().localeCompare(b.sector.toLowerCase())))
                }    
            })
        }
    },[])

    const handleChange = (e) => {
        setSelSec(e.target.value)
        props.callBackSectorChange(e.target.value)
    }

    return (
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Sectors</InputLabel>
                <Select
                size="small"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selSec}
                label="Sectors"
                onChange={handleChange}
                >
                {
                    sectors ? sectors.map(item => <MenuItem value={item}>{item.sector}</MenuItem>) : null
                }
            </Select>
          </FormControl>
        </Box>
      );
}

export default SectorDropDown