import { useSelector} from 'react-redux'
import {Box} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const ListViewAnalysis = (props) =>{
    //{'perchange':10,'symbol':"AAPL",'close':211.5,'volume':1122334443}
    let streamingData = []
    const streamdata = useSelector(state => state.streamingquotes?.streamdata)
    //perchange,symbol,volume,close
    if (streamdata){
        streamingData.push(streamdata)
    }
    console.log("streamdatastreamdatastreamdata",streamdata)

    const columns = [
        {field: 'symbol', headerName: 'Stock', headerAlign: 'center',flex: 1, align:'center'},
        {field: 'perchange', headerName: '% Change', headerAlign: 'center',flex: 1 , align:'center'},
        {field: 'close', headerName: 'Close', headerAlign: 'center',flex: 1 , align:'center'},
        {field: 'volume', headerName: 'Volume', headerAlign: 'center',flex: 1 , align:'center'},
    ];

    return(
        <Box sx={{height:"100%",width:"100%"}}>
            <DataGrid
                density="compact"
                disableColumnMenu
                rows={streamingData}
                columns={columns}
                pageSize={100}
                rowsPerPageOptions={[100]}
                getRowId={row => Math.random()}
            />   
        </Box>      
    )

}

export default ListViewAnalysis