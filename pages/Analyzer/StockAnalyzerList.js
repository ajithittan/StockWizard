import {useEffect, useState} from "react"
import {Box} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {getCachedRecentStksCnts} from '../../modules/cache/cachetopstockpatterns'
import StockAnalyzerPatterns from './StockAnalyzerPatterns'
import StockAnalyzerPatternDates from './StockAnalyzerPatternDates'
import DispPatternTrack from './DispPatternTrack'
import CompanyInformationListView from '../CompanyDetails/CompanyInformationListView'
import { useRouter } from 'next/router'

const StockAnalyzerList = (props) =>{

    const [stkPtrns,setStkPtrns] = useState(null)
    const [limitDays,setLimitDays] = useState(60)

    const router = useRouter()
    
    useEffect(() =>{
        const cacheKey = "REC_STKS_CNTS_" + limitDays || 60
        getCachedRecentStksCnts(cacheKey,{limitDays:limitDays || 60}).then(retval => {
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

    const getLinkForStock = (inpStk) => <a href="#" onClick={() => showPriceChart(inpStk?.row?.symbol)}>{inpStk?.row?.symbol}</a>
    
    const showPriceChart = (stk) => router.push({pathname: '/PriceCharts',query: {stock:stk,dur:12}})

    const getCompanyInformation = (inpStk) => <CompanyInformationListView stock={inpStk?.row?.symbol} setSubHeader={() =>{}}/>
   
    const columns = [
        {field: 'yy', variant:"contained", headerName: 'Track' , align:'center' , headerAlign: 'center', renderCell: (row) => getTrackingForStock(row)},
        {field: 'symbol',headerClassName:"contained", headerName: 'Stock', headerAlign: 'center',align:'center',renderCell: (row) => getLinkForStock(row)},
        {field: 'count', headerName: 'Count', headerAlign: 'center',align:'center'},
        {field: 'zz', headerName: 'CompanyInfo', headerAlign: 'center',align:'center',renderCell: (row) => getCompanyInformation(row),flex:0.2},
        {field: 'xx', headerName: 'Patterns' , headerAlign: 'center', renderCell: (row) => getPatternsForStock(row),flex:1}
        //,{field: 'yy', headerName: 'Dates' , headerAlign: 'center', minWidth: 300, renderCell: (row) => getPatternDatesForStock(row)}
      ];

    return (
            <Box 
            sx={{ width:"98%",height:"90vh" }}>
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
                            getRowClassName = {(params) => params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'}
                        />      : null    
                }
            </Box>    
    )
}

export default StockAnalyzerList