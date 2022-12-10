 import { useEffect, useState } from 'react' 
import StockSelector from '../stocks/StockSelector'
import ModelSelector from './ModelSelector'
import {generatePredictionModel,savePredictionModel,deletePredictionModel} from '../../modules/api/StockPrediction'
import { Button,TextField,Box} from "@mui/material"
import myGif from '../../public/loading-loading-forever.gif'
import Image from 'next/image';
import PolynomialRegression from './PolynomialRegression'
import DisplayResults from './DisplayResults'
import SavedModels from './SavedModels'
import FeatureSelection from './FeatureSelection'
import ModelPerformance from './ModelPerformance'

const Prediction = () =>{

    const [stock,setStock] = useState(null)
    const [model,setModel] = useState(null)
    const [daysAhead,setDaysAhead] = useState(4)
    const [waiting,setWaiting] = useState(null)
    const [disableBtn,setdisableBtn] = useState(true)
    const [addParams,setaddParams] = useState(null)
    const [results,setresults] = useState(null)
    const [features,setFeatures] = useState(null)
    const [unqId,setunqId] = useState(0)
    const [modToAnalyze, setmodToAnalyze] = useState(null)

    useEffect(() =>{
        enableSubmit()
    },[stock,model,features])

    useEffect(() =>{
        setmodToAnalyze(null)
    },[stock])

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
                  features:features,
                  dispFeature: features.map(item => item.feature + "_" + (item.value ? item.value : "")).toString()
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
        setunqId(unqId + 1)
    }

    const updFeatures = (features) =>{
        setFeatures(features)
    }

    const delModel = async (modelId) =>{
        let delVal = await deletePredictionModel(modelId)
        if (delVal){
            setunqId(unqId + 1)
        }
    }
    function Item(props) {
        const { sx, ...other } = props;
        console.log("sxxxxxx",sx, {...other} )
        return (
          <Box
            sx={{
              p: 2,
              m: 1,
              bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : 'grey.100'),
              color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
              border: '1px solid',
              borderColor: (theme) =>
                theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
              borderRadius: 2,
              fontSize: '0.875rem',
              fontWeight: '700',
            }}
            {...other}
          />
        );
      }

      const analyzeModel = (inpData) =>{
        console.log(inpData)
        setmodToAnalyze(inpData)
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
        <div style={{ width: '100%' }}>
            <Box
                sx={{
                display: 'flex',
                flexDirection: 'row',
                p: 1,
                m: 1,
                bgcolor: 'background.paper',
                borderRadius: 1,
                }}>
                    {stock ? <Item><SavedModels key={stock+unqId} stock={stock} delete={delModel} actionAnalyze={analyzeModel}/></Item> : null}
                    {modToAnalyze ? <Item><ModelPerformance key={modToAnalyze} modelObj={modToAnalyze}/></Item> : null}
            </Box>
        </div>
        </>
    )
}

export default Prediction