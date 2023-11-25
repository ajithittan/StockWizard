import Box from '@mui/material/Box';
import PresetControls from './PresetControls'
import Grid from '@mui/material/Grid';

const BottomNav = (props) => {

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