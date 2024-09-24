import { useEffect, useState } from "react"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Newsfeeds from '../Newsfeeds'
import {useSelector} from 'react-redux'

const TopNews = () =>{

    const {dashboardstocks} = useSelector((state) => state.dashboardlayout)

    return(
        <Box sx={{ p: 0.5, minHeight:"40vh", maxHeight:"70vh", borderRadius: 1,overflow: "auto"
        ,scrollbarWidth: "none", // Hide the scrollbar for firefox
        '&::-webkit-scrollbar': {
            display: 'none', // Hide the scrollbar for WebKit browsers (Chrome, Safari, Edge, etc.)
        }}}>
            <Grid container display="flex" spacing={2} direction="row" justify="center">
                <Grid item>
                        <Newsfeeds stocks={dashboardstocks}></Newsfeeds>
                </Grid>
            </Grid>
        </Box>
    )
}

export default TopNews