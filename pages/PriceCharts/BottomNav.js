import { useEffect, useState } from 'react' 
import PresetControls from './PresetControls'
import {initiateCaching} from '../../modules/api/StockMaster'
import ChartActions from './ChartActions'
import Duration from '../../components/Duration'

const BottomNav = (props) => {
  
  let presetConfig = [{"type":"IND","options":[{"value":"SMA"},{"value":50},{"value":120}]},
                      {"type":"IND","options":[{"value":"SMA"},{"value":100},{"value":120}]},
                      {"type":"IND","options":[{"value":"SMA"},{"value":200},{"value":120}]}]

  useEffect(() =>{
    initiateCaching(props.stock,presetConfig)
  },[props.stock])

   return (
        <>
        <Duration changedval={props.onchangedur}></Duration>
        <ChartActions stock={props.stock}></ChartActions>
        <PresetControls stock={props.stock} onChanges={props.onChanges} adjSelections={props.adjSelections}></PresetControls>
        </>
  ) 
}

export default BottomNav