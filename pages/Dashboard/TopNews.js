import { useEffect, useState } from "react"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Newsfeeds from '../Newsfeeds'

const TopMovers = (props) =>{

    return(
        <Box sx={{ p: 3, minHeight:"40vh", maxHeight:"50vh", borderRadius: 1,overflow: "auto"}} >
            <Grid container display="flex" spacing={2} direction="row" justify="center" alignItems="stretch">
                <Grid item>
                        <Newsfeeds key={props.stocks} stocks={props.stocks}></Newsfeeds>
                </Grid>
            </Grid>
        </Box>
    )

}

export default TopMovers