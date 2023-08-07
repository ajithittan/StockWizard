import { useEffect, useState } from "react"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemText from '@mui/material/ListItemText';
import {getTopStockMovers} from '../../modules/api/StockDetails'

const TopMovers = (props) =>{
    const LIMIT_ITEMS = 7
    let [topGainers,setTopGainers] = useState(null)
    let [topLosers,setTopLosers] = useState(null)
    let [topActTraded,setTopActTraded] = useState(null)

    useEffect(() =>{
        getTopStockMovers().then(retval => {
            retval?.top_gainers ? setTopGainers(retval.top_gainers) : null
            retval?.top_losers ? setTopLosers(retval.top_losers) : null
            retval?.most_actively_traded ? setTopActTraded(retval.most_actively_traded) : null
        })
    },[])

    const columns = [
            { field: 'ticker', headerName: 'Ticket', width: 90 },
            {
                field: 'price',
                headerName: 'Price',
                width: 150,
            },
            {
                field: 'change_amount',
                headerName: 'Change',
                width: 150,
            },
            {
                field: 'change_percentage',
                headerName: 'Change%',
                width: 150,
            }
    ]

    return(
        <Box sx={{ p: 3, minHeight:"40vh", maxHeight:"70vh", borderRadius: 1,overflow: "auto"}} >
            <Grid container display="flex" spacing={2} direction="row" justify="center" alignItems="stretch">
                <Grid item xs={4} md={4}>
                    <List dense={true} subheader={<ListSubheader sx={{color:"green"}}>Gainers</ListSubheader>}>
                    {topGainers?.slice(0,LIMIT_ITEMS).map(item => 
                        <ListItem disableGutters>
                            <ListItemText primaryTypographyProps={{fontSize: '13px'}}  primary={item.ticker + "-" + item.price}
                            secondaryTypographyProps={{fontSize: '11px'}} secondary= {item.change_amount + " " + parseFloat(item.change_percentage).toFixed(2) +"%"} />
                        </ListItem>
                    )}
                    </List>
                </Grid>
                <Grid item xs={4} md={4}>
                    <List dense={true} subheader={<ListSubheader sx={{color:"red"}}>Losers</ListSubheader>}>
                    {topLosers?.slice(0,LIMIT_ITEMS).map(item => 
                        <ListItem>
                            <ListItemText primaryTypographyProps={{fontSize: '13px'}}  primary={item.ticker + "-" + item.price}
                            secondaryTypographyProps={{fontSize: '11px'}} secondary= {item.change_amount + " " + parseFloat(item.change_percentage).toFixed(2) +"%"} />
                        </ListItem>
                    )}
                    </List>
                </Grid>
                <Grid item xs={4} md={4}>
                    <List dense={true} subheader={<ListSubheader>Active</ListSubheader>}>
                    {topActTraded?.slice(0,LIMIT_ITEMS).map(item => 
                        <ListItem>
                            <ListItemText primaryTypographyProps={{fontSize: '13px'}}  primary={item.ticker + "-" + item.price}
                            secondaryTypographyProps={{fontSize: '11px'}} secondary= {item.change_amount + " " + parseFloat(item.change_percentage).toFixed(2) +"%"} />
                        </ListItem>
                    )}
                    </List>
                </Grid>
            </Grid>
        </Box>
    )

}

export default TopMovers