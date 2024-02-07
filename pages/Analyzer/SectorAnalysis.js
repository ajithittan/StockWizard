import { useEffect, useState } from "react";
import {getAnalysisForStock} from '../../modules/api/Sectors'
import {Box} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const SectorAnalysis = (props) =>{
    const [inpData,setInpData] = useState(null)

    useEffect(() =>{
        getAnalysisForStock("HON","ALL_IND",5,5).then(retval => setInpData(retval.reverse()))
    },[])

    const columns = [
        {field: 'date', headerName: 'date', width: 100 , headerAlign: 'center' },
        {field: 'close', headerName: 'close', width: 100  , headerAlign: 'center' },
        {field: 'close_roll_max_pc', headerName: 'close_roll_max_pc', width: 100  , headerAlign: 'center' },
        {field: 'SMA_20_pc', headerName: 'SMA_20_pc', width: 100  , headerAlign: 'center' },
        {field: 'SMA_50_pc', headerName: 'SMA_50_pc', width: 100  , headerAlign: 'center' },
        {field: 'SMA_200_pc', headerName: 'SMA_200_pc', width: 100  , headerAlign: 'center' },
        {field: 'rsi_14', headerName: 'rsi_14', width: 100  , headerAlign: 'center' },
        {field: 'MACD', headerName: 'MACD', width: 100  , headerAlign: 'center' }        
      ];

              return (
                <Box sx={{ width:"90%",height:600 }}>
                    {
                        console.log("inpData",inpData),
                        inpData ?                 
                            <DataGrid
                                density="compact"
                                rows={inpData}
                                columns={columns}
                                pageSize={15}
                                rowsPerPageOptions={[30]}
                                getRowId={row => Math.random()}
                            />      : null    
                    }
            </Box>      
  );
}

export default SectorAnalysis

