import Grid from '@mui/material/Grid';
import { useState,useEffect } from 'react';
import Typography from '@mui/material/Typography';

const DurationPicker = (props) =>{

    const [options,setOptions] = useState(null)
    const [sizeOfGrid,setSizeOfGrid] = useState(1.6)

    useEffect(() =>{
      if(props.inpvals){
        setOptions(props.inpvals)
      }else{
        const inpvals = [
          {
              value: 1,
              label: '1M',
          },  
          {
            value: 3,
            label: '3M',
          },
          {
              value: 6,
              label: '6M',
          },
          {
              value: 12,
              label: '1Y',
            },
            {
              value: 24,
              label: '2Y',
            },
            {
              value: 60,
              label: '5Y',
            },
            {
              value: 120,
              label: '10Y',
            },   
        ]
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