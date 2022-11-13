 import { useEffect, useState } from 'react' 
import StockSelector from '../stocks/StockSelector'
import ModelSelector from './ModelSelector'
import {generatePredictionModel,savePredictionModel} from '../../modules/api/StockPrediction'
import { Button,TextField} from "@mui/material"
import myGif from '../../public/loading-loading-forever.gif'
import Image from 'next/image';
import PolynomialRegression from './PolynomialRegression'
import DisplayResults from './DisplayResults'
import SavedModels from './SavedModels'
import FeatureSelection from './FeatureSelection'

const Prediction = () =>{

    const [stock,setStock] = useState(null)
    const [model,setModel] = useState(null)
    const [daysAhead,setDaysAhead] = useState(4)
    const [waiting,setWaiting] = useState(null)
    const [disableBtn,setdisableBtn] = useState(true)
    const [addParams,setaddParams] = useState(null)
    const [results,setresults] = useState(null)
    const [features,setFeatures] = useState(null)

    useEffect(() =>{
        enableSubmit()
    },[stock,model,features])

    const generateModel = async () =>{
        setdisableBtn(true)
        if (stock && model && additionalParams()){
            let reqBody = {}
            if (addParams){
                for(let i=0;i < addParams.length;i++){
                    reqBody[addParams[i].Type]=addParams[i].Val
                }    
            }
            reqBody.daysAhead = daysAhead
            reqBody.features = features
            console.log(stock,model,reqBody)
            setWaiting(1)
            let retVal = await generatePredictionModel(stock,model,reqBody)
            console.log("retVal after generatePredictionModel",retVal)
            let consolidate = retVal.map(item => {
                const newPropsObj = {
                  stock:stock,
                  prediction:model,
                  daysAhead: daysAhead,
                  features:features
                };              
                // Assign new properties and return
                return Object.assign(item, newPropsObj);
              })
            console.log("consolidate",consolidate)
            setresults(consolidate)
            setdisableBtn(false)
            setWaiting(2)    
        }
    }

    const additionalParams = () => {
        console.log("additional params",addParams)
        let retval = false
        if (model === "PR"){
            if (addParams){
                retval = true
            }
        }else{
            retval = true
        }
        return retval
    }

    const enableSubmit = () =>{
        if (stock && features && model && !isNaN(daysAhead) && model !== "0"){
            setdisableBtn(false)
        }else{
            setdisableBtn(true)
        }
    }

    const saveModel = async (modelParams) =>{
        let retval = await savePredictionModel(stock,model,modelParams)
    }

    const updFeatures = (features) =>{
        console.log("did I make it here?")
        setFeatures(features)
    }
    
    return (
        <>
        <div className="PredictionMainDiv">
            <StockSelector updStock={setStock}></StockSelector>
            <TextField id="outlined-basic" label="Days" variant="outlined" size="small" 
                                               onChange={(e) => setDaysAhead(e.target.value)}>{daysAhead}</TextField>                                               

            <ModelSelector updModSel={setModel}></ModelSelector>
            {
                model === "PR" ? <PolynomialRegression additionalParams={setaddParams}></PolynomialRegression> : null
            }
            <FeatureSelection selectFeatures={updFeatures}></FeatureSelection>
            <Button  variant="contained" size="small" disabled={disableBtn} pt={1} onClick={generateModel}>Generate Model</Button> 
            {waiting ? waiting ===1 ? <Image src={myGif} alt="wait" height={30} width={30} /> : null : null}
        </div>
        <DisplayResults results={results} save={saveModel}></DisplayResults>
        <SavedModels key={stock} stock={stock} />
        </>
    )
}

export default Prediction