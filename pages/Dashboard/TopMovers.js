import { useEffect, useState } from "react"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {getTopStockMovers} from '../../modules/api/StockDetails'
import useMediaQuery from '@mui/material/useMediaQuery';
import Chip from '@mui/material/Chip';
import {useDispatch,useSelector} from 'react-redux'
import {updPortfolioStocks} from '../../redux/reducers/portfolioStockSlice'
import DoneIcon from '@mui/icons-material/Done';

const TopMovers = () =>{
    const dispatch = useDispatch()
    const sm = useMediaQuery("(max-width: 700px)");
    const {stockList} = useSelector((state) => state.porfoliostock)
    let LIMIT_ITEMS = 100
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

    const saveNewPositions = (stocksel) => dispatch(updPortfolioStocks(stocksel))

    const stockIsInPortfolio = (stock) => stockList?.includes(stock)

    const getChipComponent = (inpLabel,inpVal,stock) =>{
        const getColor = {"positive":"#B1FFCA","negative":"#F08080"}
        return (
            <>
                <Chip
                    variant="outlined"
                    deleteIcon={stockIsInPortfolio(stock) ? <DoneIcon /> : null}
                    label={inpLabel}
                    size="small"
                    sx={{
                        backgroundColor:inpVal >=0 ? getColor["positive"] : getColor["negative"],
                        margin:sm ? "0.5px" : "2px",
                        fontSize:sm ? "12px" : "12px",
                        whiteSpace: 'normal',
                        minWidth: "100%",
                        overflow: "hidden",
                        color:'text.secondary',
                    }}
                    onClick={ () => saveNewPositions([stock]) } 
                    onDelete={stockIsInPortfolio(stock) ? () =>{} : null}
                />
            </>
        )
    }

    return(
        <Box sx={{ p: 0.5, maxHeight: sm ? "50vh" : "70vh", borderRadius: 1,overflow: "auto"
                ,scrollbarWidth: "none", // Hide the scrollbar for firefox
                '&::-webkit-scrollbar': {
                    display: 'none', // Hide the scrollbar for WebKit browsers (Chrome, Safari, Edge, etc.)
            },}} >               
            <Grid container display="flex" spacing={2} direction="row" justify="center" alignItems="stretch">
                <Grid item xs={5} md={4}>
                   {topGainers?.slice(0,LIMIT_ITEMS).map(item => 
                        //getChipComponent(parseFloat(item.change_percentage).toFixed(2) +"% " + item.ticker + " " + item.price + " " + item.change_amount,parseFloat(item.change_percentage))
                        getChipComponent(parseFloat(item.change_percentage).toFixed(2) +"% " + item.ticker,parseFloat(item.change_percentage),item.ticker)
                  )}
                </Grid>
                <Grid item xs={5} md={4}>
                    {topLosers?.slice(0,LIMIT_ITEMS).map(item => 
                        getChipComponent(parseFloat(item.change_percentage).toFixed(2) +"% " + item.ticker,parseFloat(item.change_percentage),item.ticker)
                    )}
                </Grid>
                <Grid item xs={5} md={4}>
                    {sm ? <hr></hr> : null}
                    {topActTraded?.slice(0,LIMIT_ITEMS).map(item => 
                        getChipComponent(parseFloat(item.change_percentage).toFixed(2) +"% " + item.ticker,parseFloat(item.change_percentage),item.ticker)
                  )}
                </Grid>
            </Grid>
        </Box>
    )

}

export default TopMovers