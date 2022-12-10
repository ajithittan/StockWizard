import {Select,MenuItem,InputLabel,FormControl} from "@mui/material"
import { useState } from "react"

const ModelSelector = (props) =>{

    const [modelSelected,setmodelSelected] = useState(null)

    return(
        <FormControl>
            <InputLabel id="pred_model">Prediction Model</InputLabel>
            <Select id="PredModelsDropDown" size="small" labelId="pred_model" label="Prediction Model"
                                            onChange={e => props.updModSel(e.target.value)} defaultValue={0} >
                <MenuItem value={0} selected={true}>Select Model</MenuItem>                                                 
                <MenuItem value="PR">Polynomial Regression</MenuItem>
                <MenuItem value="LR">Linear Regression</MenuItem>
                <MenuItem value="SVR">Support Vector Regression</MenuItem>
                <MenuItem value="LASSORR">Lasso Regression</MenuItem>
            </Select>
        </FormControl>
    )
}

export default ModelSelector
