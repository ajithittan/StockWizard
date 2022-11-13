import {Select,MenuItem,TextField,FormControl,Button} from "@mui/material"
import { useState,useEffect } from "react"

const ModelSelector = (props) =>{

    const variousIndTypes = ["ADX","DI","RSI"]
    const [inputVals, setinputVals] = useState(null)
    const [addFeatures,setaddFeatures] = useState (null)
    const [duration,setDuration] = useState (null)

    useEffect(()=>{
        if (props.features){
            setaddFeatures(props.features)
        }

    },[props.features])

    const inputValues = () =>{

        if (variousIndTypes.includes(inputVals)){
            return  <TextField id="outlined-basic" label="Duration" variant="outlined" size="small"
                        onChange={(e) => setDuration(e.target.value)}>{duration}</TextField>
        }

    }

    const addOnToFeatures = () =>{
        let objFeature = {}
        objFeature.feature = inputVals
        if (variousIndTypes.includes(inputVals)){
            objFeature.value = duration
        }
        if(addFeatures){
            setaddFeatures([...addFeatures,objFeature])
        }else{
            setaddFeatures([objFeature])
        }
    }

    const removeFromFeatures = (indx) =>{
        addFeatures.splice(indx,1)
        setaddFeatures([...addFeatures])
    }

    const submitFeatures = () =>{

        if (addFeatures && addFeatures.length > 0){
            props.newFeatures(addFeatures)
        }

    }

    return(
        <FormControl>
            {
                   addFeatures ? 
                        <div className="PredictionColDiv">
                            {addFeatures.map((item, indx) => <> <span><a href="#" title ="remove" onClick={() =>removeFromFeatures(indx)}>{indx + 1}</a> - {item.feature} {item.value}</span> </>)}
                        </div> : null
            }
            <div className="PredictionMainDiv">
            <Select id="PredModelsDropDown" size="small" labelId="pred_model" label="Select Indicator" 
                        defaultValue={0} onChange={(e) => setinputVals(e.target.value)}>
                <MenuItem value={0} selected={true}>Select Indicator</MenuItem>                                                 
                <MenuItem value="ADX">ADX</MenuItem>
                <MenuItem value="DI">DMI</MenuItem>
                <MenuItem value="RSI">RSI</MenuItem>
                <MenuItem value="MACD">MACD</MenuItem>
                <MenuItem value="C">close</MenuItem>
                <MenuItem value="V">Volume</MenuItem>
            </Select>
            {inputVals ? inputValues() : null}
            {inputVals ? <Button  variant="contained" size="small" pt={2} onClick={addOnToFeatures}>Add</Button> : null}
            </div>
            <br></br>
            <Button width="10px"  variant="contained" size="small" pt={2} onClick={submitFeatures}>Submit</Button>
        </FormControl>
    )
}

export default ModelSelector
