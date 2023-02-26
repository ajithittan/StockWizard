import { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const StocksDropDown = (props) =>{

    const [stocks, setStocks] = useState(null);
    const [selStk,setSelStk] = useState(null)

    useEffect(async () =>{
        if (props.stocks){
            setStocks(props.stocks.sort((a,b) => a > b))
        }
    },[props.stocks])

    useEffect(() =>{
        console.log("props.selStock",props.selStock)
        setSelStk(props.selStock)
    },[props.selStock])

    const handleChange = (e) => {
        setSelStk(e.target.value)
        props.callBackStockChange(e.target.value)
    }

    return (
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth variant="standard">
                <InputLabel id="demo-simple-select-label" shrink={true}>Stock</InputLabel>
                <Select
                size="small"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selStk}
                label="Sectors"
                onChange={handleChange}
                >
                {
                    stocks ? stocks.map(item => <MenuItem value={item}>{item}</MenuItem>) : null
                }
            </Select>
          </FormControl>
        </Box>
      );
}

export default StocksDropDown