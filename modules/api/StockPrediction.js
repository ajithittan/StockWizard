import axios from "axios";

const generatePredictionModel  = async (stock,modelType,modalParams) =>{
    let url = "/api/genpredictions/" + stock + "/" + modelType
    const data = await axios.post(url,modalParams)
    return data.data
}

const savePredictionModel  = async (stock,modelType,modalParams) =>{
    let url = "/api/savemodel/" + stock + "/" + modelType
    const data = await axios.post(url,modalParams)
    return data.data
}

const getPredictionModel  = async (stock) =>{
    let url = "/api/predictionmodels/" + stock
    const data = await axios.get(url)
    return data.data
}

const getPredictionsForStock = async (stock,modelId) =>{
    let url = "/api/predictions/getprediction/" + stock + "/" + modelId
    const data = await axios.get(url)
    return data.data
}

const deletePredictionModel  = async (modelId) =>{
    const data = await axios.post("/api/predictions/delmodel/" + modelId)
    return data.data
}

export {generatePredictionModel,savePredictionModel,getPredictionModel,getPredictionsForStock,deletePredictionModel}