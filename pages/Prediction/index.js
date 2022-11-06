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

const Prediction = () =>{

    const [stock,setStock] = useState(null)
    const [model,setModel] = useState(null)
    const [profit,setProfit] = useState(4)
    const [loss,setLoss] = useState(4)
    const [daysAhead,setDaysAhead] = useState(4)
    const [waiting,setWaiting] = useState(null)
    const [disableBtn,setdisableBtn] = useState(true)
    const [addParams,setaddParams] = useState(null)
    const [results,setresults] = useState(null)


    useEffect(() =>{
        enableSubmit()
    },[stock,model,profit,loss])

    const generateModel = async () =>{
        setdisableBtn(true)
        if (stock && model && additionalParams()){
            let reqBody = {}
            reqBody.profit = profit
            reqBody.loss = loss
            for(let i=0;i < addParams.length;i++){
                reqBody[addParams[i].Type]=addParams[i].Val
            }
            console.log(stock,model,reqBody)
            setWaiting(1)
            let retVal = await generatePredictionModel(stock,model,reqBody)
            let consolidate = retVal.map(item => {
                const newPropsObj = {
                  stock:stock,
                  prediction:model,
                  profit:profit,
                  loss:loss
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
        }
        return retval
    }

    const enableSubmit = () =>{
        console.log(stock , model , !isNaN(profit) , !isNaN(loss) , !isNaN(daysAhead) , model === "0")
        if (stock && model && !isNaN(profit) && !isNaN(loss) && !isNaN(daysAhead) && model !== "0"){
            setdisableBtn(false)
        }else{
            setdisableBtn(true)
        }
    }

    const saveModel = async (modelParams) =>{
        let retval = await savePredictionModel(stock,model,modelParams)
        console.log("retval - saveModel",retval)
    }
    
    return (
        <>
        <div className="PredictionMainDiv">
            <StockSelector updStock={setStock}></StockSelector>
            <TextField id="outlined-basic" label="Profit" variant="outlined" size="small" 
                                               onChange={(e) => setProfit(e.target.value)}>{profit}</TextField>
            <TextField id="outlined-basic" label="Loss" variant="outlined" size="small" 
                                               onChange={(e) => setLoss(e.target.value)}>{loss}</TextField>                                               
            <TextField id="outlined-basic" label="Days" variant="outlined" size="small" 
                                               onChange={(e) => setDaysAhead(e.target.value)}>{daysAhead}</TextField>                                               

            <ModelSelector updModSel={setModel}></ModelSelector>
            {
                model === "PR" ? <PolynomialRegression additionalParams={setaddParams}></PolynomialRegression> : null
            }
            <Button  variant="contained" size="small" disabled={disableBtn} pt={1} onClick={generateModel}>Generate Model</Button> 
            {waiting ? waiting ===1 ? <Image src={myGif} alt="wait" height={30} width={30} /> : null : null}
        </div>
        <DisplayResults results={results} save={saveModel}></DisplayResults>
        <SavedModels key={stock} stock={stock} />
        </>
    )
}

export default Prediction