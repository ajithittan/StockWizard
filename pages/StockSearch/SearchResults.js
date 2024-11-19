import { useEffect, useState} from 'react'
import {getSearchResults} from '../../modules/api/StockIndicators'
import {Box} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import WaitingForResonse from '../../components/WaitingForResponse'
import useMediaQuery from '@mui/material/useMediaQuery';
import {getConciseValuesForLargeNums} from '../../modules/utils/UtilFunctions'

const SearchResults = (props) =>{

    const sm = useMediaQuery("(max-width: 1200px)");
    const [results,setResults] = useState(null)
    const [waiting,setWaiting] = useState(false)
    const [hideCol,setHideCol] = useState({
        title: false,
        SMA_50:false,
    })

    const [hideColPhone,setHideColPhone] = useState({
        title: false,
        sector: false,
        marketcap: false,
        rsi_14:false,
        high52:false,
        low52:false,
        marketcap:false,
        SMA_50:false,
        SMA_200:false,
        ADX_14:false,
        MACD:false,
        SMA_20:false
    })

    const resetColumns = (inpQuery) =>{
        let arrvals = inpQuery.flatMap(item => [item.type + (item.param > 0 ? "_" + item.param : "") , item.val])
        if (sm){
            setHideColPhone(initval => {
                for(let i=0;i<arrvals.length;i++){
                    if (initval.hasOwnProperty(arrvals[i])) {
                        initval[arrvals[i]] = true
                    }
                }
                return initval
            })
        }else{
            setHideCol(initval => {
                for(let i=0;i<arrvals.length;i++){
                    if (initval.hasOwnProperty(arrvals[i])) {
                        initval[arrvals[i]] = true
                    }
                }
                return initval
            })
        }   
    }

    useEffect(() =>{
        if(props.query && props.query.length >0){
            setWaiting(true)
            let finalQuery = {}
            finalQuery["search"] = props.query
            getSearchResults(finalQuery).then(output => {setResults(output),setWaiting(false)})
            resetColumns(props.query)
        }
    },[props.query])

    const columns = [
        {field: 'symbol', headerName: 'Stock', flex: 1},
        {field: 'title', headerName: 'Title', flex: 1},
        {field: 'sector', headerName: 'Sector', flex: 2},
        {field: 'close', headerName: 'Close', flex: 1},
        {field: 'perchange', headerName: '% Change', flex: 1},
        {field: 'high52', headerName: '52WH', flex: 1},
        {field: 'low52', headerName: '52WL', flex: 1},
        {field: 'marketcap', headerName: 'MCap', flex: 1, valueFormatter: (params) => getConciseValuesForLargeNums(params.value)},
        {field: 'rsi_14', headerName: 'RSI 14', flex: 1},
        {field: 'SMA_20', headerName: 'SMA 20', flex: 1},
        {field: 'SMA_50', headerName: 'SMA 50', flex: 1,},
        {field: 'SMA_200', headerName: 'SMA 200', flex: 1},
        {field: 'ADX_14', headerName: 'ADX 14', flex: 1},
        {field: 'MACD', headerName: 'MACD', flex: 1}
    ];

    return(
        <>
            {waiting ? <WaitingForResonse></WaitingForResonse> : null}
            {results ? 
                <Box sx={{height:"100%",width: "98vw"}} margin={0.5}>
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
                        columnVisibilityModel={sm ? hideColPhone : hideCol}
                        onColumnVisibilityModelChange={(newModel) => sm ? setHideCol(newModel) : setHideColPhone(newModel)}
                    />   
                </Box>                          
            :null}
        </>
    )
}

export default SearchResults