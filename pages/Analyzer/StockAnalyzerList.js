import {useEffect, useState} from "react"
import {Box} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {getCachedRecentStksCnts} from '../../modules/cache/cachetopstockpatterns'
import StockAnalyzerPatterns from './StockAnalyzerPatterns'
import StockAnalyzerPatternDates from './StockAnalyzerPatternDates'
import DispPatternTrack from './DispPatternTrack'

const StockAnalyzerList = (props) =>{

    const [stkPtrns,setStkPtrns] = useState(null)
    const [limitDays,setLimitDays] = useState(30)
    
    useEffect(() =>{
        const cacheKey = "REC_STKS_CNTS_" + limitDays || 30
        getCachedRecentStksCnts(cacheKey,{limitDays:limitDays || 30}).then(retval => {
            if (retval.length > 0){
                    setStkPtrns([...retval].sort((a,b) => b.count - a.count))
                }
            }
        )
    },[])

    const getPatternsForStock = (inpStk) =>{
        return <StockAnalyzerPatterns stock={inpStk?.row?.symbol} limitDays={limitDays}/>
    }

    const getPatternDatesForStock  = (inpStk) => <StockAnalyzerPatternDates stock={inpStk?.row?.symbol} limitDays={limitDays}/>
    
    const getTrackingForStock = (inpStk) => <DispPatternTrack stock={inpStk?.row?.symbol} ></DispPatternTrack>
   
    const columns = [
        {field: 'yy', variant:"contained", headerName: 'Track' , align:'center' , headerAlign: 'center', renderCell: (row) => getTrackingForStock(row)},
        {field: 'symbol',headerClassName:"contained", headerName: 'Stock', headerAlign: 'center',align:'center'},
        {field: 'count', headerName: 'Count', headerAlign: 'center',align:'center'},
        {field: 'xx', headerName: 'Patterns' , headerAlign: 'center', renderCell: (row) => getPatternsForStock(row),flex:1}
        //,{field: 'yy', headerName: 'Dates' , headerAlign: 'center', minWidth: 300, renderCell: (row) => getPatternDatesForStock(row)}
      ];

    return (
            <Box sx={{ width:"90%",height:"90vh" }}>
                {
                    stkPtrns ?                 
                        <DataGrid
                            density="compact"
                            getRowHeight={() => 'auto'}
                            rows={stkPtrns}
                            columns={columns}
                            pageSize={30}
                            rowsPerPageOptions={[30]}
                            getRowId={row => Math.random()}
                        />      : null    
                }
            </Box>    
    )
}

export default StockAnalyzerList