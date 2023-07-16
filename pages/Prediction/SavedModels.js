import {Box,Button} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from "react"
import {getPredictionModel} from '../../modules/api/StockPrediction'

const SavedModels = (props) =>{

    const [results,setResults] = useState(null)
    const [disable,setDisable] = useState(false)

    const deleteModel = (params) =>{
        setDisable(true)
        props.delete(params.idstockpredictionmodels)
        setTimeout(() => setDisable(false), 1000)
    }

    useEffect (() =>{
        if(props.stock){
            getPredictionModel(props.stock).then(retval =>{
                if (retval.length > 0){
                    setResults(retval)
                }    
            })
        }
    },[])

    const analyzeModel = (inpData) =>{
        props.actionAnalyze(inpData)
    }

    const actionBtn = (inpData,actionType) => {
        if (actionType === "DE"){
            deleteModel(inpData)
        }else if (actionType === "AZ") {
            analyzeModel(inpData)
        }
    }

    const columns = [
        {field: 'symbol', headerName: 'Stock', width: 100 , headerAlign: 'center' },
        {field: 'model_type', headerName: 'Prediction Model', width: 100  , headerAlign: 'center' },
        {field: 'predictiondays', headerName: 'Days', width: 100  , headerAlign: 'center' },
        {field: 'model_param', headerName: 'Add Param', width: 100  , headerAlign: 'center' },
        {field: 'create_dt', headerName: 'Created', width: 100  , headerAlign: 'center' },
        { field: 'analyze', headerName: 'Analyze', width: 150, renderCell: (row) => renderButton(row,"AZ","Analyze")  , headerAlign: 'center' },
        { field: 'delete', headerName: 'Delete', width: 150, renderCell: (row) => renderButton(row,"DE","Delete")  , headerAlign: 'center' }
      ];

      const renderButton = (params,type,dispName) => {
        return (
            <strong>
                <Button
                    variant="contained"
                    disabled={disable}
                    color="primary"
                    size="small"
                    style={{ marginLeft: 16 }}
                    onClick={() => actionBtn(params.row,type)}>
                    {dispName}
                </Button>
            </strong>
        )
    }  

    return(
        <div className="PredictionMainDiv">
            {results? 
                <Box sx={{ width: 800,height:600 }}>
                <DataGrid
                    rows={results}
                    columns={columns}
                    pageSize={15}
                    rowsPerPageOptions={[15]}
                    getRowId={row => Math.random()}
                />   
                </Box>      
            :null}
        </div>
    )
}

export default SavedModels
