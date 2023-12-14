import { useState } from 'react'
import Chip from '@mui/material/Chip';

const PresetControls = (props) =>{
    const [selected,setSelected] = useState(false)

    const [presetConfig ,setPresetConfig] = useState([{"type":"sma","value":50,"selected":false},{"type":"sma","value":100,"selected":false}
                        ,{"type":"sma","value":200,"selected":false}])
    
    const handleSmaChanges = (inpType,value) =>{
        let currVal = presetConfig.filter(item => item.type === inpType && item.value === value)[0]["selected"]
        let applyChanges = {}
        if (currVal){
            applyChanges.action = "R"
        }else{
            applyChanges.action = "A"
        }
        applyChanges.type = inpType
        applyChanges.value = value
        props.onChanges(applyChanges)
        setPresetConfig([...presetConfig.map(item => item.type === inpType && item.value === value? {...item,"selected":!currVal} : item)])
    }

    const getLabel = (inpType,value) => {
        const label = [{"type":"sma","text":"XX Day Moving Average"},
                       {"type":"Ema","text":"XX Exponential Moving Average"}]
        return label.filter(item => item.type===inpType)[0]["text"].replace("XX", value);
    }

    return(
        <>
            {presetConfig.map(item =>             
              <>  
                <Chip
                variant={item.selected ? "filled" : "outlined"}
                label={getLabel(item.type,item.value)}
                onClick={() => handleSmaChanges(item.type,item.value)}
                color= {"success"}
                sx={{ color: selected ? "none" : props?.color}}
                size="small"
            />&nbsp;</>)
            }
        </>
    )
}

export default PresetControls