import { useEffect, useState,useRef,forwardRef } from "react"
import Grid from '@mui/material/Grid';
import ScreenerList from './ScreenerList'
import Paper from '@mui/material/Paper';
import {useSelector,useDispatch} from 'react-redux'
import Chip from '@mui/material/Chip';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import {HIDE_BOTTOM_CONT,SHOW_BOTTOM_CONT,REMOVE_ROW_DATA} from '../../redux/reducers/stockScreenerSlice'
import Stocks from '../stocks' 
import IntraDayPatternScreener from './IntraDayPatternScreener'
import {SET_DASH_STOCKS,REM_FRM_DASH_STOCKS} from '../../redux/reducers/profileDashSlice'

const MainScreenerContainer = () =>{
    const dispatch = useDispatch()
    const refMainCont = useRef()
    const refSmallCont = useRef()
    const [display, setDisplay] = useState(true)
    const [lstOfItms, setLstOfItms] = useState(null)
    const [mainContainer,setMainContainer] = useState(null)
    const [restOfItems,setRestOfItems] = useState(null)

    const {dispsettings} = useSelector(state => state.stockscreener)
    const {clkctxdata} = useSelector(state => state.stockscreener)

    useEffect(() =>{
        if (clkctxdata && clkctxdata.filter(item => item.type === "STOCK_GRAPH").map(item => item?.data?.symbol).length > 0){
            dispatch(SHOW_BOTTOM_CONT())
            setRestOfItems(clkctxdata.filter(item => item.type === "STOCK_GRAPH").map(item => item?.data?.symbol))
            if (clkctxdata[0]?.type === "INTRA_DAY"){
                dispatch(SET_DASH_STOCKS(clkctxdata.filter(item => item.type === "STOCK_GRAPH").map(item => item?.data?.symbol)))
            }else{
                let stocksbelow = clkctxdata.filter(item => item.type === "STOCK_GRAPH").map(item => item?.data?.symbol).slice(1)
                dispatch(SET_DASH_STOCKS(stocksbelow))
            }
            
        }   
    },[clkctxdata])

    useEffect(() =>{
        if(lstOfItms?.length){
            setMainContainer(lstOfItms[0])
            if ([...lstOfItms.slice(1)].length >0){
                dispatch(SHOW_BOTTOM_CONT())
                setRestOfItems([...lstOfItms.slice(1)])
            }else{
                dispatch(HIDE_BOTTOM_CONT())
            }
        }
    },[lstOfItms])


    return (
        <>  
            <ScreenerList onselect={setLstOfItms} refmain={refMainCont} refSmallCont={refSmallCont}></ScreenerList>
            <Grid container>
                {
                    mainContainer ? 
                        <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{display: dispsettings.showMainContainer? null : "none"}}>
                                <Paper 
                                  elevation={0} sx={{height:dispsettings.maincontht + dispsettings.mainconthttp, overflow:"scroll" 
                                  ,scrollbarWidth: "none", // Hide the scrollbar for firefox
                                      '&::-webkit-scrollbar': {
                                          display: 'none', // Hide the scrollbar for WebKit browsers (Chrome, Safari, Edge, etc.)
                                      }}}   
                                  ref={refMainCont}>
                                  {
                                      /*** 
                                       * <legend align="center"><h4>&nbsp;&nbsp;<a href="#" onClick={() =>dispatch(UPD_DISP_SETTINGS({"showMainContainer":false}))}>{dispsettings?.showDataTp}&nbsp;Day Stock Patterns</a>&nbsp;&nbsp;</h4></legend>
                                      */
                                  }    
                                  {
                                      clkctxdata[0]?.type === "INTRA_DAY" ? null : <IntraDayPatternScreener mini={true}></IntraDayPatternScreener>
                                  }
                                  {mainContainer}
                                </Paper>
                        </Grid>
                        :null   
                }
                <Grid xs={12} sm={12} md={12} lg={12} xl={12}>
                      {
                          clkctxdata.filter(item => item.type === "STOCK_GRAPH").map(item => item?.data)?.map(item =>                                     
                            <Chip
                            variant={"outlined"}
                            label={item.symbol}
                            color= {"primary"}
                            size="small"
                            cursor="pointer"
                            //onClick={() => addNewDataFeed(data)}
                            onDelete={() => {dispatch(REM_FRM_DASH_STOCKS(item.symbol)),dispatch(REMOVE_ROW_DATA(item.id))}}
                            deleteIcon={<DeleteOutlinedIcon />}
                          />)
                      }      
                </Grid>    
                {
                    restOfItems? 
                    <div style={{display: dispsettings.showBottomContainer? null : "none",height:dispsettings.restcontht + dispsettings.restconthttp,width:"100%"}}>
                        <Stocks></Stocks>
                    </div> :null
                }
            </Grid>
        </>
    )}

export default forwardRef(MainScreenerContainer)


