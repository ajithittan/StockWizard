import {Box,Button} from '@mui/material';
import { DataGrid} from '@mui/x-data-grid';
import { useEffect, useState } from "react"

const DisplayResults = (props) =>{

    const [results,setResults] = useState(null)
    const [disable,setDisable] = useState(false)

    const saveModelAction = (params) =>{
        setDisable(true)
        props.save(params)
        setTimeout(() => setDisable(false), 2000)
    }

    const columns = [
        {field: 'stock', headerName: 'Stock', width: 100 , headerAlign: 'center' },
        {field: 'prediction', headerName: 'Prediction Model', width: 100  , headerAlign: 'center' },
        {field: 'daysAhead', headerName: 'Days', width: 100  , headerAlign: 'center' },
        {
          field: 'training_error',
          headerName: 'Training Error',
          width: 200,
          headerAlign: 'center' 
        },
        {
          field: 'validation_error',
          headerName: 'Validation Error',
          width: 200,
          headerAlign: 'center' 
        },
        {
          field: 'r2_score',
          headerName: 'R2 Score',
          width: 200,
          headerAlign: 'center' 
        },
        { field: 'degree', headerName: 'Degree', width: 100  , headerAlign: 'center' },
        { field: 'features', headerName: 'features', width: 100  , headerAlign: 'center' , hide: true },
        { field: 'dispFeature', headerName: 'features', width: 200  , headerAlign: 'center' },
        { field: 'save', headerName: 'Save', width: 150, renderCell: (row) => renderDetailsButton(row)  , headerAlign: 'center' },
      ];

      const renderDetailsButton = (params) => {
        return (
            <strong>
                <Button
                    variant="contained"
                    disabled={disable}
                    color="primary"
                    size="small"
                    style={{ marginLeft: 16 }}
                    onClick={() => saveModelAction(params.row)}>
                    Save Model
                </Button>
            </strong>
        )
    }

    useEffect(() =>{
        if(props.results){
            if (results){
                console.log("props.results",props.results)
                setResults([...results,...props.results])
            }else{
                setResults(props.results)
            }
        }
    },[props.results])

    return(
        <div className="PredictionMainDiv">
            {results? 
                <Box sx={{ width:"80%",height:600 }}>
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

export default DisplayResults
