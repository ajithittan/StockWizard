import React,{useEffect, useState,} from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const MainGrid = (props) => {

  const [widdim,setWiddim] = useState(null)

  useEffect(() =>{
    setWiddim(2)
  })

  return (
    <>
    {console.log(props.items)}
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} direction={{ xs: 'column', md: 'row' }}>
        {console.log("started")}
        {props.items ? props.items.map(item => 
        <Grid item xs={widdim}>
          <Item style={{background:'lightgray',height:'100%'}}>
              {item}
          </Item>
        </Grid>):null}
        {console.log("ended")}
      </Grid>
    </Box>
    </>
  );
}

export default MainGrid 