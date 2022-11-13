import {Select,MenuItem,InputLabel,FormControl} from "@mui/material"
import { useState,useEffect } from "react"
import {getPredictionModel} from '../../modules/api/StockPrediction'

const PredictionModels = (props) =>{

    const [models,setModels] = useState(null)

    useEffect(async () =>{
        if (!models){
            let retval = await getPredictionModel(props.stock)
            if (retval.length > 0){
                setModels(retval)
            }
        }
    },[props.stock])

    const changeModel = (e) =>{
        if (parseInt(e.target.value) > 0){
            props.onpredictionchange(e.target.value)
        }
    }

    return(
        <FormControl>
            <InputLabel id="pred_model">Prediction Model</InputLabel>
            <Select id="PredModelsDropDown" size="small" labelId="pred_model" label="Prediction Model"
                                         name="uni" defaultValue={0}  onChange={changeModel}>
                <MenuItem value={0} selected={true}>Select Model</MenuItem>                                                
                {
                    models ? models.map(item => <MenuItem value={item.idstockpredictionmodels}>
                                    {item.model_name}</MenuItem>) : null
                }                                               
            </Select>
        </FormControl>
    )
}

export default PredictionModels