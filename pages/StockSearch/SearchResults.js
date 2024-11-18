import { useEffect, useState} from 'react'
import {getSearchResults} from '../../modules/api/StockIndicators'
import {Box} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import WaitingForResonse from '../../components/WaitingForResponse'

const SearchResults = (props) =>{

    const [results,setResults] = useState(null)
    const [waiting,setWaiting] = useState(true)

    useEffect(() =>{
        if(props.query && props.query.length >0){
            setWaiting(true)
            let finalQuery = {}
            finalQuery["search"] = props.query
            getSearchResults(finalQuery).then(output => {setResults(output),setWaiting(false)})
        }
    },[props.query])

    const columns = [
        {field: 'symbol', headerName: 'Stock', headerAlign: 'center',flex: 1, align:'center'},
        {field: 'title', headerName: 'Title', headerAlign: 'center',flex: 1, align:'center'},
        {field: 'sector', headerName: 'Sector', headerAlign: 'center',flex: 1, align:'center'},
        {field: 'close', headerName: 'Close', headerAlign: 'center',flex: 1, align:'center'},
        {field: 'perchange', headerName: '% Change', headerAlign: 'center',flex: 1, align:'center'},
        {field: 'high52', headerName: '52W High', headerAlign: 'center',flex: 1, align:'center'},
        {field: 'low52', headerName: '52W Low', headerAlign: 'center',flex: 1, align:'center'},
        {field: 'marketcap', headerName: 'Mcap', headerAlign: 'center',flex: 1, align:'center'},
        {field: 'rsi_14', headerName: 'RSI 14', headerAlign: 'center',flex: 1, align:'center'},
        {field: 'SMA_20', headerName: 'SMA 20', headerAlign: 'center',flex: 1, align:'center'},
        {field: 'SMA_50', headerName: 'SMA 50', headerAlign: 'center',flex: 1, align:'center'},
        {field: 'SMA_200', headerName: 'SMA 200', headerAlign: 'center',flex: 1, align:'center'},
        {field: 'ADX_14', headerName: 'ADX 14', headerAlign: 'center',flex: 1, align:'center'},
        {field: 'MACD', headerName: 'MACD', headerAlign: 'center',flex: 1, align:'center'}
    ];

    return(
        <>
            {waiting ? <WaitingForResonse></WaitingForResonse> : null}
            {results ? 
                <Box sx={{height:"100%",width:"100%"}}>
                    <DataGrid
                        autoHeight
                        initialState={{
                            density: 'compact',
                        }}
                        rows={results}
                        columns={columns}
                        pageSize={100}
                        rowHeight={30}
                        rowsPerPageOptions={[100]}
                        getRowId={row => Math.random()}
                    />   
                </Box>                          
            :null}
        </>
    )
}

export default SearchResults