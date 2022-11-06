import {Box,Button} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from "react"
import {getPredictionModel} from '../../modules/api/StockPrediction'

const SavedModels = (props) =>{

    const [results,setResults] = useState(null)
    const [disable,setDisable] = useState(false)

    useEffect (async () =>{
        if(props.stock){
            let retval = await getPredictionModel(props.stock)
            if (retval.length > 0){
                setResults(retval)
            }

            console.log("retval - SavedModels",retval)
        }

    },[])

    const columns = [
        {field: 'symbol', headerName: 'Stock', width: 100 , headerAlign: 'center' },
        {field: 'model_type', headerName: 'Prediction Model', width: 100  , headerAlign: 'center' },
        {field: 'profit', headerName: 'Profit', width: 100  , headerAlign: 'center' },
        {field: 'stoploss', headerName: 'Loss', width: 100  , headerAlign: 'center' },
        {field: 'model_param', headerName: 'Add Param', width: 100  , headerAlign: 'center' },
        {field: 'create_dt', headerName: 'Created', width: 100  , headerAlign: 'center' }
      ];

    return(
        <div className="PredictionMainDiv">
            {results? 
                <Box sx={{ width: 1/3,height:600 }}>
                <legend>Saved Models</legend>
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
