import { useEffect, useState } from 'react'
import StockInChip from '../stocks/StockInChip'
import Grid from '@mui/material/Grid';

const StackChipView = (props) => {
    const [inpData,setInpData] = useState(null)

    useEffect(() =>{
        setInpData(props.inputvals)
    },[props.inputvals])

  return (
    <Grid container layout={'row'}>
        {
            inpData ? Object.keys(inpData).map(item => inpData[item].length > 10 ?
                    <Grid style={{border: "1px solid lightgray",borderRadius: "5px"}} item xs={11} sm={11} md={11} lg={11} xl={11} margin={1}>
                        {
                            inpData[item].map(eachitem => <StockInChip details={eachitem} margin={0.2}/>)
                        }
                    </Grid> : null 
            ) : null
        }  
    </Grid> 
  );
}

export default StackChipView