import { useState,useEffect } from 'react'
import { useSelector} from 'react-redux'
import {Box} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const ListViewAnalysis = (props) =>{
    //{'perchange':10,'symbol':"AAPL",'close':211.5,'volume':1122334443}
    const [streamingData,setStreamingData] = useState([])
    const streamdata = useSelector(state => state.streamingquotes?.streamdata)
    //perchange,symbol,volume,close
    useEffect(() =>{
        if (streamdata){
            let tempstream = streamdata.filter(item => props?.stocks?.includes(item.symbol))
            setStreamingData(tempstream.sort((a,b) => Math.abs(b.perchange) - Math.abs(a.perchange)))
        }    
    },[streamdata])

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
