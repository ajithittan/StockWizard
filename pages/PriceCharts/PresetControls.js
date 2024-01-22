import { useState } from 'react'
import Chip from '@mui/material/Chip';
import {ADD_ELEMENTS_TO_CHART,HIDE_ADDED_ITEMS_IN_CHART} from '../../redux/reducers/chartDataSlice'
import {getRollingSMA,} from '../../modules/api/StockIndicators'
import {useDispatch} from 'react-redux'

const PresetControls = (props) =>{
    const dispatch = useDispatch()
    const [selected,setSelected] = useState(false)
    const [presetConfig ,setPresetConfig] = useState(
                        [
                         {"type":"sma","value":50,"selected":false,"state":undefined},
                         {"type":"sma","value":100,"selected":false,"state":undefined},
                         {"type":"sma","value":200,"selected":false,"state":undefined}
                        ])
    
    const handleSmaChanges = (inpType,value) =>{
        let currVal = presetConfig.filter(item => item.type === inpType && item.value === value)[0]["selected"]
        let dataState = presetConfig.filter(item => item.type === inpType && item.value === value)[0]["state"]
        
        if (currVal){
            dispatch(HIDE_ADDED_ITEMS_IN_CHART(dataState))
            setPresetConfig([...presetConfig.map(item => item.type === inpType && item.value === value? {...item, "selected":!currVal} : item)])    
        }else{
            getSMAData(props.stock,value).then(retval => 
                addElementsToChart(retval,"LINE").then(ret => 
                    {
                        setPresetConfig([...presetConfig.map(item => item.type === inpType && item.value === value? {...item, "state": ret,"selected":!currVal} : item)])    
                        dispatch(ADD_ELEMENTS_TO_CHART(ret))
                    }
                )
            )
        }
    }

    const getSMAData = async(stk,indval) =>{
        let res = await getRollingSMA(stk,indval,120)
        return res.map(item => ({close:item["SMA_" + indval],symbol:stk,qualifier:"SMA_" + indval,date:item.date}))
    }

    const addElementsToChart = async (inpdata,type) =>{
        let uniq = (new Date()).getTime();
        let chartElementToAdd = {}
        chartElementToAdd.id = uniq
        chartElementToAdd.symbol = props.stock
        chartElementToAdd.type = type
        chartElementToAdd.chartdata = inpdata 
        chartElementToAdd.normalize = true
        return [chartElementToAdd]
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