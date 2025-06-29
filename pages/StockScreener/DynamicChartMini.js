import { forwardRef,useRef } from "react"
import DeleteIcon from '@mui/icons-material/Delete';
import ChartEntry from '../PriceCharts/ChartEntry'

const DynamicChartMini = forwardRef((props,ref) =>{

  const handleClick = (val) => {
      const actionval = {action:'focus'}
      props.actions('focus')
  }

  const removeFromList = () => {
    const actionval = {action:'remove'}
    props.actions('remove')
  }

  return(
      <>
      <ChartEntry key={props.chartdata} chartdata={props.chartdata} stock={props.symbol} ref={ref}/>
      <button onClick={handleClick}>{props.symbol}</button>
      <DeleteIcon onClick={removeFromList} sx={{cursor:"pointer"}}></DeleteIcon>
      </>
  )
})

export default DynamicChartMini