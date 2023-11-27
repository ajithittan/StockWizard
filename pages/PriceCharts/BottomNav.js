import { useEffect, useState } from 'react' 
import Box from '@mui/material/Box';
import PresetControls from './PresetControls'
import Grid from '@mui/material/Grid';
import {initiateCaching} from '../../modules/api/StockMaster'

const BottomNav = (props) => {

  let presetConfig = [{"type":"IND","options":[{"value":"SMA"},{"value":50},{"value":120}]},
                      {"type":"IND","options":[{"value":"SMA"},{"value":100},{"value":120}]},
                      {"type":"IND","options":[{"value":"SMA"},{"value":200},{"value":120}]}]
  useEffect(() =>{
    initiateCaching(props.stock,presetConfig)
  },[props.stock])

   return (
      <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0,paddingLeft:"30px",paddingBottom:"15px"}}>
          <Grid container display="flex" spacing={2} direction="row" justify="center" alignItems="stretch">
            <Grid item>
                <PresetControls onChanges={props.onChanges} adjSelections={props.adjSelections}></PresetControls>
            </Grid>
            <Grid item>
            </Grid>
          </Grid>
      </Box>
  );
}

export default BottomNav