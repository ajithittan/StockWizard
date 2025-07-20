import { forwardRef,useRef } from "react"
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import ChartEntry from '../PriceCharts/ChartEntry'
import {useSelector,useDispatch} from 'react-redux'
import {UPD_DISP_SETTINGS} from '../../redux/reducers/stockScreenerSlice'
import Paper from '@mui/material/Paper';
import DynamicChart from './DynamicChart'

const DynamicChartMini = forwardRef((props,ref) =>{
  const dispatch = useDispatch()
  const {dispsettings} = useSelector(state => state.stockscreener)

  const handleClick = (val) => {
      const actionval = {action:'focus'}
      props.actions('focus')
      dispatch(UPD_DISP_SETTINGS({"showMainContainer":true}))
  }

  const removeFromList = () => {
    const actionval = {action:'remove'}
    props.actions('remove')
  }

  return(
    <Paper 
    elevation={0} sx={{overflow:"scroll" 
    ,scrollbarWidth: "none", // Hide the scrollbar for firefox
        '&::-webkit-scrollbar': {
            display: 'none', // Hide the scrollbar for WebKit browsers (Chrome, Safari, Edge, etc.)
        }}}>
      <DynamicChart key={props.symbol} chartdata={props.chartdata} symbol={props.symbol} ref={ref} callBackFunction={props.callBackFunction}/>
      </Paper>
  )
})

export default DynamicChartMini