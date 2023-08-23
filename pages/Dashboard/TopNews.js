import { useEffect, useState } from "react"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Newsfeeds from '../Newsfeeds'

const TopMovers = (props) =>{

    return(
        <Box sx={{ p: 0.5, minHeight:"40vh", maxHeight:"70vh", borderRadius: 1,overflow: "auto"
        ,scrollbarWidth: "none", // Hide the scrollbar for firefox
        '&::-webkit-scrollbar': {
            display: 'none', // Hide the scrollbar for WebKit browsers (Chrome, Safari, Edge, etc.)
        }}}>
            <Grid container display="flex" spacing={2} direction="row" justify="center">
                <Grid item>
                        <Newsfeeds key={props.stocks} stocks={props.stocks}></Newsfeeds>
                </Grid>
            </Grid>
        </Box>
    )
}

export default TopMovers