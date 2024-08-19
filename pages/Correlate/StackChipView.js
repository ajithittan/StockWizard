import { useEffect, useState } from 'react'
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';

const StackChipView = (props) => {
    const [inpData,setInpData] = useState(null)

    useEffect(() =>{
        if (props.inputvals){
            console.log(props.inputvals)
            setInpData(props.inputvals)
        }
    },[props.inputvals])

  return (
    <Grid container layout={'row'}>
        {
            inpData ? Object.keys(inpData).map(item => inpData[item].length > 3 ?
                    <Grid style={{border: "1px solid lightgray",borderRadius: "5px"}} item xs={11} sm={11} md={3.5} lg={3.5} xl={3.5} margin={1}>
                        {
                            inpData[item].map(eachitem => <Chip style={{margin:"1.5px"}} label={eachitem} color="primary"/>)
                        }
                    </Grid>    : null 
            ) : null
        }  
    </Grid> 
  );
}

export default StackChipView