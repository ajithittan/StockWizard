import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Stocks from '../stocks'
import Newsfeeds from '../Newsfeeds'
import ChartsForDashBoard from './ChartsForDashBoard'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  alignContent:'center',
  overflow:"scroll",
  color: theme.palette.text.secondary,
  margin:"100px"
}));

const Item1 = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  alignContent:'center',
  height: "25vh",
  overflow:"scroll",
  color: theme.palette.text.secondary,
}));

const Item2 = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  //textAlign: 'center',
  overflow:"scroll",
  height: "90vh",
  color: theme.palette.text.secondary,
}));

const DashBoard = (initialSetUpItems) => {

  const feedtypes = [3,4,2,6]
    

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={0.5} direction={{ xs: 'column', sm: 'row' }} rowSpacing={1} columnSpacing={3}>
        <Grid item xs={9}>
          <Grid container spacing={0.5} direction="column" rowSpacing={1}>
            <Grid item xs={12}>
              <Item1>
                <Stocks />
              </Item1>
            </Grid>
            <Grid sx={{ width: "90%", height: "60vh", marginLeft:"5%", marginTop:"2%" }}>
              <ChartsForDashBoard />
            </Grid>   
           </Grid>
        </Grid>
        <Grid item xs={3} >
          <Item2><Newsfeeds feedtype={JSON.stringify(feedtypes)}/></Item2>
        </Grid>
      </Grid>
    </Box>
  );
}

export default DashBoard