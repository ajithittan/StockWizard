import Grid from '@mui/material/Grid';
import { useState,useEffect } from 'react';
import Typography from '@mui/material/Typography';

const DurationPicker = (props) =>{

    const [options,setOptions] = useState(null)
    const [sizeOfGrid,setSizeOfGrid] = useState(null)

    useEffect(() =>{
      if(props.inpvals){
        setOptions(props.inpvals)
      }else{
        const inpvals = [
          {
            value: {type:"D",val:"1"},
            label: '1D',
          },  
          {
            value: {type:"D",val:"5"},
            label: '5D',
          },  
          {
              value: {type:"M",val:"1"},
              label: '1M',
          },  
          {
            value: {type:"M",val:"3"},
            label: '3M',
          },
          {
              value: {type:"M",val:"6"},
              label: '6M',
          },
          {
              value: {type:"M",val:"12"},
              label: '1Y',
            },
            {
              value: {type:"M",val:"24"},
              label: '2Y',
            },
            {
              value: {type:"M",val:"60"},
              label: '5Y',
            },
            {
              value: {type:"M",val:"120"},
              label: '10Y',
            },   
        ]
        setSizeOfGrid(12/inpvals.length)
        setOptions(inpvals)
      }
    },[props.inpvals])

    const changeDuration = (val) =>{
        props.ondurchange(val)
    }

    return (
      <Grid
            container
            direction="row"
            justify="space-evenly"
            align="stretch"
            sx={{width:props.width}}
        >
        {
          options?.map(item => 
            <Grid xs={sizeOfGrid} sm={sizeOfGrid} md={sizeOfGrid} lg={sizeOfGrid} xl={sizeOfGrid} sx={{cursor:"pointer"}} onClick={() => changeDuration(item.value)}>
              <Typography variant="overline" color={props.color}>
                {item.label}
              </Typography>
            </Grid>
          ) 
        }
      </Grid>    
    )

}

export default DurationPicker