import { useEffect, useState } from 'react' 
import PresetControls from './PresetControls'
import {initiateCaching} from '../../modules/api/StockMaster'

const BottomNav = (props) => {
  
  let presetConfig = [{"type":"IND","options":[{"value":"SMA"},{"value":50},{"value":120}]},
                      {"type":"IND","options":[{"value":"SMA"},{"value":100},{"value":120}]},
                      {"type":"IND","options":[{"value":"SMA"},{"value":200},{"value":120}]}]

  useEffect(() =>{
    initiateCaching(props.stock,presetConfig)
  },[props.stock])

   return (
        <PresetControls onChanges={props.onChanges} adjSelections={props.adjSelections}></PresetControls>
  )
}

export default BottomNav