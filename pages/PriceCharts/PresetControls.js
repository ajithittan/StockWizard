import { useState } from 'react'
import Chip from '@mui/material/Chip';
import {ADD_ELEMENTS_TO_CHART,HIDE_ADDED_ITEMS_IN_CHART} from '../../redux/reducers/chartDataSlice'
import {getRollingSMA,} from '../../modules/api/StockIndicators'
import {useDispatch} from 'react-redux'
import {createModelAndGeneratePredictions} from '../../modules/api/StockPrediction'
import WaitingForResonse from '../../components/WaitingForResponse'

const PresetControls = (props) =>{
    const dispatch = useDispatch()
    const [selected,setSelected] = useState(false)
    const [presetConfig ,setPresetConfig] = useState(
            [
                {"type":"sma","value":50,"selected":false,"state":undefined,"waiting":false},
                {"type":"sma","value":100,"selected":false,"state":undefined,"waiting":false},
                {"type":"sma","value":200,"selected":false,"state":undefined,"waiting":false},
                {"type":"prediction", "value":"5 and 14 Day RSI 5 days ahead","selected":false,"state":undefined,"waiting":false,
                    "options":{
                        'daysAhead': 5, 
                        'features': [{'feature': 'RSI', 'value': '5'},{'feature': 'RSI', 'value': '14'}, {'feature': 'C'}], 
                        'predictlastdays': 60,
                        'model':"LASSOR"}
                },
                {"type":"prediction", "value":"14 Day RSI 5 days ahead","selected":false,"state":undefined,"waiting":false,
                "options":{
                    'daysAhead': 5, 
                    'features': [{'feature': 'SMA', 'value': '5'},{'feature': 'SMA', 'value': '20'}, {'feature': 'C'}], 
                    'predictlastdays': 60,
                    'model':"LASSOR"}
                }
     
            ]
        )

    const getSMAData = async(stk,indval) =>{
        let res = await getRollingSMA(stk,indval,120)
        return res.map(item => ({close:item["SMA_" + indval],symbol:stk,qualifier:"SMA_" + indval,date:item.date}))
    }

    const getPredictions  = async(stock,reqBody) =>{
        let retVal = await createModelAndGeneratePredictions(stock,reqBody)
        retVal = await JSON.parse(retVal.prediction)
        retVal = await retVal.map(item => ({close:item["prediction"],symbol:stock,date:item.pred_date}))
        return retVal
    }

    const addElementsToChart = async (inpdata,type) =>{
        console.log("inpdata",inpdata)
        let uniq = (new Date()).getTime();
        let chartElementToAdd = {}
        chartElementToAdd.id = uniq
        chartElementToAdd.symbol = props.stock
        chartElementToAdd.type = type
        chartElementToAdd.chartdata = [...inpdata]
        chartElementToAdd.normalize = true
        return [chartElementToAdd]
    }

    const getLabel = (inpType,value) => {
        const label = [{"type":"sma","text":"XX Day Moving Average"},
                       {"type":"ema","text":"XX Exponential Moving Average"},
                       {"type":"prediction","text":"Predict - XX"}]
        return <>{label.filter(item => item.type===inpType)[0]["text"].replace("XX", value)}</>
    }

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

    const handlePredictions = (inpType,value) =>{      
        let currVal = presetConfig.filter(item => item.type === inpType && item.value === value)[0]["selected"]
        let dataState = presetConfig.filter(item => item.type === inpType && item.value === value)[0]["state"]

        if (currVal){
            dispatch(HIDE_ADDED_ITEMS_IN_CHART(dataState))
            setPresetConfig([...presetConfig.map(item => item.type === inpType && item.value === value? {...item, "selected":!currVal} : item)])    
        }else{
            let pred_options = presetConfig.filter(item => item.type === inpType && item.value === value)[0]["options"]
            getPredictions(props.stock,pred_options).then(retval => {
                addElementsToChart(retval,"LINE").then(ret => 
                    {
                        setPresetConfig([...presetConfig.map(item => item.type === inpType && item.value === value? {...item, "state": ret,"selected":!currVal} : item)])    
                        dispatch(ADD_ELEMENTS_TO_CHART(ret))
                    })
                }
            )
        }
    }

    const actOnSelection = (type,value) =>{
        if (type==="sma"){
            handleSmaChanges(type,value)
        }else if (type==="prediction"){
            handlePredictions(type,value)
        }
    }

    return(
        <>
            {presetConfig.map(item =>             
              <>  
                <Chip
                variant={item.selected ? "filled" : "outlined"}
                label={getLabel(item.type,item.value)}
                onClick={() => actOnSelection(item.type,item.value)}
                color= {"success"}
                sx={{ color: selected ? "none" : props?.color}}
                size="small"
            />&nbsp;</>)
            }
        </>
    )
}

export default PresetControls