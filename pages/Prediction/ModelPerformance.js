import {Box,Button} from '@mui/material';
import { DataGrid} from '@mui/x-data-grid';
import { useEffect, useState } from "react"
import {getPredictionsForStock} from '../../modules/api/StockPrediction'

const ModelPerformance = (props) =>{

    const [results,setResults] = useState(null)
    const [disable,setDisable] = useState(false)

    const saveModelAction = (params) =>{
        setDisable(true)
        props.save(params)
        setTimeout(() => setDisable(false), 2000)
    }

    const columns = [
        {field: 'date', headerName: 'Date', width: 100 , headerAlign: 'center' },
        {field: 'high', headerName: 'High', width: 100 , headerAlign: 'center' },
        {field: 'low', headerName: 'Low', width: 100 , headerAlign: 'center' },
        {field: 'close', headerName: 'Close', width: 100 , headerAlign: 'center' },
        {field: 'predictedVals', headerName: 'Prediction', width: 100  , headerAlign: 'center' },
        {field: 'perChange', headerName: 'Change%', width: 100  , headerAlign: 'center' },
      ];

    useEffect (() =>{
        if(props.modelObj){
            getPredictionsForStock(props.modelObj.symbol,props.modelObj.idstockpredictionmodels).then(retval => {
                if (retval.length > 0){
                    setResults(retval)
                }    
            })
        }
    },[])

    return(
        <div className="PredictionMainDiv">
            {results? 
                <Box sx={{ width:700,height:600 }}>
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

export default ModelPerformance
