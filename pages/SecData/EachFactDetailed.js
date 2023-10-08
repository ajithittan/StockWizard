import { isRejectedWithValue } from '@reduxjs/toolkit'
import { useState,useEffect } from 'react'
import {getRawCompanyStatsByType} from '../../modules/api/StockDetails'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const EachFactDetailed = (props) =>{

    const [dataForCompany,setDataForCompany] = useState(null)

    useEffect (() =>{
        if(props.inpVals){
            getRawCompanyStatsByType(props.inpVals.type,props.inpVals.stock,props.inpVals.repType).then(retval => {
                if (retval && retval.length > 0 ){
                    setDataForCompany(retval)
                }
            })
        }
    },[props.inpVals])

    const columns = [
        { field: 'end', headerName: 'End', width: 200},
        { field: 'val', headerName: 'Value', width: 200},
        { field: 'fy', headerName: 'FY', width: 100},
        { field: 'frame', headerName: 'Frame', width: 100},
        { field: 'fp', headerName: 'FY', width: 100}
      ];

    return(
        <>
            {
                 dataForCompany ? 
                    <Box sx={{ height: '60vh', width: '100vh'}} component="fieldset">
                        <legend>{props.inpVals.type}</legend>
                        <DataGrid
                            getRowHeight={() => 'auto'}
                            rows={dataForCompany}
                            columns={columns}
                            initialState={{
                                pagination: {
                                paginationModel: {
                                    pageSize: 500,
                                },
                                },
                            }}
                            pageSizeOptions={[5]}
                            disableRowSelectionOnClick
                            getRowId={row => Math.random()}/>
                    </Box>
                    :null
            }
        </>
    )
}

export default EachFactDetailed