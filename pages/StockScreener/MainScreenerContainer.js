import { useEffect, useState,useRef,forwardRef } from "react"
import Grid from '@mui/material/Grid';
import ScreenerList from './ScreenerList'
import Paper from '@mui/material/Paper';
import {useSelector,useDispatch} from 'react-redux'
import Divider from '@mui/material/Divider';
import {UPD_DISP_SETTINGS,HIDE_BOTTOM_CONT,SHOW_BOTTOM_CONT} from '../../redux/reducers/stockScreenerSlice'

const MainScreenerContainer = () =>{
    const dispatch = useDispatch()
    const refMainCont = useRef()
    const refSmallCont = useRef()
    const [display, setDisplay] = useState(true)
    const [lstOfItms, setLstOfItms] = useState(null)
    const [mainContainer,setMainContainer] = useState(null)
    const [restOfItems,setRestOfItems] = useState(null)

    const {dispsettings} = useSelector(state => state.stockscreener)

   
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
                                  , marginLeft:"20px",marginTop:"10px",scrollbarWidth: "none", // Hide the scrollbar for firefox
                                      '&::-webkit-scrollbar': {
                                          display: 'none', // Hide the scrollbar for WebKit browsers (Chrome, Safari, Edge, etc.)
                                      }}}
                                  ref={refMainCont}>
                                  {
                                      /*** 
                                       * <legend align="center"><h4>&nbsp;&nbsp;<a href="#" onClick={() =>dispatch(UPD_DISP_SETTINGS({"showMainContainer":false}))}>{dispsettings?.showDataTp}&nbsp;Day Stock Patterns</a>&nbsp;&nbsp;</h4></legend>
                                      */
                                  }    
                                  
                                  {mainContainer}
                                </Paper>
                        </Grid>
                        :null   
                }
                {
                    restOfItems? 
                    <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{display: dispsettings.showBottomContainer? null : "none"}}>
                            <Paper elevation={0} sx={{height:dispsettings.restcontht + dispsettings.restconthttp,marginLeft:"10px",marginTop:"5px"}}>
                                <Divider></Divider>
                                <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                    {
                                        restOfItems?.map(item => (
                                            <Grid  xs={12} sm={12} md={6} lg={3} xl={3} ref={refSmallCont} marginTop={1}>
                                                {item}
                                            </Grid>
                                        ))
                                    }
                                </Grid>    
                            </Paper>
                    </Grid> :null
                }
            </Grid>
        </>
    )}

export default forwardRef(MainScreenerContainer)