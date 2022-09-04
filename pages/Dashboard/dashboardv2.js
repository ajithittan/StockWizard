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
    

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={0.5} direction="row" rowSpacing={1} columnSpacing={3}>
        <Grid item xs={8}>
          <Grid container spacing={0.5} direction="row" rowSpacing={1} columnSpacing={3}>
            <Grid item xs={12}>
              <Item1><Stocks /></Item1>
            </Grid>
            <Grid item xs={12}>
              <Item><ChartsForDashBoard /></Item>
            </Grid>   
           </Grid>
        </Grid>
        <Grid item xs={2} >
          <Item2><Newsfeeds feedtype={2}/></Item2>
        </Grid>
        <Grid item xs={2}>
          <Item2><Newsfeeds feedtype={3}/></Item2>
        </Grid>
      </Grid>
    </Box>
  );
}

export default DashBoard