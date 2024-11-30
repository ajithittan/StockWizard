import SearchAssist from './SearchAssist'
import SearchAutoFill from './SearchAutoFill'
import Grid from '@mui/material/Grid';

const SearchItems = () =>{

    return(
        <Grid container marginTop={1} marginLeft={1} marginRight={1}>
            <Grid item  xs={12} sm={4} md={4} lg={4} xl={4}>
                <SearchAutoFill></SearchAutoFill>
            </Grid>
            <Grid item xs={12} sm={7} md={7} lg={7} xl={7}> 
                <SearchAssist></SearchAssist>
            </Grid>
        </Grid>
    )
}

export default SearchItems