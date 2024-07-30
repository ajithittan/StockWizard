import { useEffect, useState } from 'react'
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';

const StackChipView = (props) => {
    const [inpData,setInpData] = useState(null)

    useEffect(() =>{
        if (props.inputvals){
            setInpData(props.inputvals)
        }
    },[props.inputvals])

  return (
    <Grid container layout={'row'}>
        {
            inpData?.map(item => item.length > 3 ?
                    <Grid style={{border: "1px solid lightgray",borderRadius: "5px"}} item xs={11} sm={11} md={3.5} lg={3.5} xl={3.5} margin={1}>
                        {
                            item.map(eachitem => <Chip style={{opacity:eachitem.value,margin:"1.5px"}} label={eachitem.stock} color="primary"/>)
                        }
                    </Grid>    : null
            )
        }  
    </Grid> 
  );
}

export default StackChipView