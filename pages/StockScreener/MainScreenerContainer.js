import { useEffect, useState,useRef,forwardRef } from "react"
import Grid from '@mui/material/Grid';
import ScreenerList from './ScreenerList'
import Paper from '@mui/material/Paper';
import {useSelector,useDispatch} from 'react-redux'
import {UPD_DISP_SETTINGS} from '../../redux/reducers/stockScreenerSlice'

const MainScreenerContainer = () =>{
    const dispatch = useDispatch()
    const refMainCont = useRef()
    const refSmallCont = useRef()
    const [display, setDisplay] = useState(true)
    const [lstOfItms, setLstOfItms] = useState(null)
    const [mainContainer,setMainContainer] = useState(null)
    const [restOfItems,setRestOfItems] = useState(null)

    const {dispsettings} = useSelector(state => state.stockscreener)

    console.log("dispsettingsdispsettingsdispsettingsdispsettings",dispsettings)
    
    useEffect(() =>{
        if(lstOfItms?.length){
            setMainContainer(lstOfItms[0])
            setRestOfItems([...lstOfItms.slice(1)])
        }
    },[lstOfItms])

    return (
        <>  
            <ScreenerList onselect={setLstOfItms} refmain={refMainCont} refSmallCont={refSmallCont}></ScreenerList>
            <Grid container >
                {
                    mainContainer ? 
                        <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{display: dispsettings.showMainContainer? null : "none"}}>
                                <Paper component="fieldset"
                                  elevation={0} sx={{height:dispsettings.maincontht + dispsettings.mainconthttp, overflow:"scroll" 
                                  ,scrollbarWidth: "none", // Hide the scrollbar for firefox
                                      '&::-webkit-scrollbar': {
                                          display: 'none', // Hide the scrollbar for WebKit browsers (Chrome, Safari, Edge, etc.)
                                      }}}
                                  ref={refMainCont}>
                                  <legend align="center"><h4>&nbsp;&nbsp;<a href="#" onClick={() =>dispatch(UPD_DISP_SETTINGS({"showMainContainer":false}))}>Intra Day Stock Patterns</a>&nbsp;&nbsp;</h4></legend>
                                  {mainContainer}
                                </Paper>
                        </Grid>
                        :null   
                }
                {
                    restOfItems?.map(item => (
                        <Grid xs={12} sm={12} md={2} lg={2} xl={2} style={{height:dispsettings.restcontht + dispsettings.restconthttp,margin:"1vh"}}>
                            <div ref={refSmallCont} >
                            {item}
                            </div>
                        </Grid>
                    ))
                }
            </Grid>
        </>
    )}

export default forwardRef(MainScreenerContainer)