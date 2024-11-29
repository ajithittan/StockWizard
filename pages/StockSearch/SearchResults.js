import { useEffect, useState} from 'react'
import {getSearchResults} from '../../modules/api/StockIndicators'
import {Box} from '@mui/material';
import { DataGrid,GridToolbar } from '@mui/x-data-grid';
import WaitingForResonse from '../../components/WaitingForResponse'
import useMediaQuery from '@mui/material/useMediaQuery';
import Chip from '@mui/material/Chip';
import {getConciseValuesForLargeNums} from '../../modules/utils/UtilFunctions'

const SearchResults = (props) =>{

    const sm = useMediaQuery("(max-width: 1200px)");
    const [results,setResults] = useState(null)
    const [waiting,setWaiting] = useState(false)
    const [hideCol,setHideCol] = useState(null)
    const [hideColPhone,setHideColPhone] = useState(null)
    const [columns,setColumns] = useState([]);
    const [density,setDensity] = useState("compact")

    useEffect(() =>{
        if(props.query && props.query.length >0){
            setWaiting(true)
            let finalQuery = {}
            finalQuery["search"] = props.query
            getSearchResults(finalQuery).then(output => { 
                if(output?.length > 0){
                    setResults(output),setWaiting(false),extractColumns(output[output.length - 1]),resetColumns(props.query)
                }
            })
        }
    },[props.query])

    const resetColumns = (inpQuery) =>{
        let arrvals = inpQuery.flatMap(item => [item.type + (item.param > 0 ? "_" + item.param : "") , item.val])
        if (sm){
            setHideColPhone(initval => {
                for(let i=0;i<arrvals.length;i++){
                    let checkval = String(arrvals[i]).replace("_***_", "");
                    if (initval.hasOwnProperty(checkval)) {
                        initval[arrvals[i]] = true
                    }else{
                        const regexpattern = `${checkval}.*` // Matches properties starting with 'a'
                        let re = new RegExp(regexpattern);
                        const matchingProps = Object.keys(initval).filter(key => re.test(key));
                        matchingProps.map(item => {initval[item] = true})
                    }
                }
                return initval
            })
        }else{
            setHideCol(initval => {
                for(let i=0;i<arrvals.length;i++){
                    let checkval = String(arrvals[i]).replace("_***_", "");
                    if (initval.hasOwnProperty(checkval)) {
                        initval[arrvals[i]] = true
                    }else{
                        const regexpattern = `${checkval}.*` // Matches properties starting with 'a'
                        let re = new RegExp(regexpattern);
                        const matchingProps = Object.keys(initval).filter(key => re.test(key));
                        matchingProps.map(item => {initval[item] = true})
                    }
                }
                return initval
            })
        }   
    }

    const hideColumns = (inpcols) =>{
        let tempObj={}
        for(let i=0;i<inpcols.length;i++){
            tempObj[inpcols[i]["field"]]=false
        }
        sm ? setHideColPhone(tempObj): setHideCol(tempObj)
    }

    const selectColumnsToDisplay = (allColumns) =>{
        const columnsToShow={'small':['symbol','close','perchange'],
                            'large':['symbol','sector','close','perchange','SMA_20','SMA_50','MACD','rsi_14']}
        let colArr = sm ? columnsToShow['small']: columnsToShow['large']
        hideColumns(allColumns.filter(item => !colArr.includes(item.field)))
    }

    const extractColumns = (inpvals) => {
        let tempCols = []
        Object?.keys(inpvals).map(item =>{
            let tempFieldObj = {}
            tempFieldObj["field"]=item
            tempFieldObj["headerName"]=item.replace(/\b[a-z]/g, (x) => x.toUpperCase())
            tempFieldObj["flex"]=1
            tempFieldObj["headerClassName"]="super-app-theme--header"
            if (item === "marketcap"){
                tempFieldObj["valueFormatter"]= (params) => getConciseValuesForLargeNums(params.value)
            }
            tempCols.push(tempFieldObj)
        })
        if (tempCols.length > 0){
            setColumns([...tempCols])
            selectColumnsToDisplay(tempCols)
        }
    }

    const unHideColumm = (colName) =>{
        let tempval = columns.map(item => {
            if (item["field"] === colName){
                return {...item,hide: false}
            }else{
                return item
            }
        })
        setColumns([...tempval])
    }

    const getHiddenColumns = () =>{
        let cols = sm ? hideColPhone : hideCol
        if (cols){
            let arrcols = Object?.keys(cols)
            return (
                <div style={{marginBottom:"5px"}}>
                    {
                        arrcols?.map(key => {
                            if (!cols[key]){
                                return (
                                    <Chip
                                    variant={"outlined"}
                                    label={key}
                                    color= {"primary"}
                                    size={sm ? "small" : "medium"}
                                    cursor="pointer"
                                    onClick={() => {
                                        cols[key]=true,
                                        unHideColumm(key)
                                        sm ? setHideColPhone(cols) : setHideCol(cols)
                                    }}
                                    />
                                )
                            }
                        })    
                    }
                    <br></br>
                </div>
            )
        }
    }

    const clickedCell = (rowvals) => {
        const colsToAct = ['sector','pattern_']
        if (colsToAct.filter(item => rowvals['field'].includes(item)).length > 0){
            let qryval = rowvals["formattedValue"]
            if (Array.isArray(rowvals["formattedValue"])){
                qryval = rowvals["formattedValue"][0]
            }
            let query = {label: rowvals['field'] + " " + qryval, query:{type:rowvals['field'],param:0,op:"contains",val:qryval}}
            props.addToQuery(query)    
        }
    }

    return(
        <>
            {waiting ? <WaitingForResonse></WaitingForResonse> : null}
            {results ? 
                <Box sx={{height:"100%",width: "98vw"}} margin={0.5}>
                    {getHiddenColumns()}                    
                    <DataGrid
                        sx={{
                            boxShadow: 2,
                            border: 2,
                            borderColor: '#B9D9EB',
                            '& .MuiDataGrid-cell:hover': {
                            color: 'primary.main',
                            },
                            '& .super-app-theme--header': {
                                backgroundColor: '#B9D9EB',
                            },
                            "& .MuiDataGrid-cell": {
                                border: 1,
                                borderRight: 0,
                                borderTop: 0,
                                borderColor: '#B9D9EB',
                                // add more css for customization
                            },
                        }}
                        autoHeight
                        initialState={{
                            density: {density},
                        }}
                        headerHeight={30} 
                        rows={results}
                        columns={columns}
                        pageSize={100}
                        rowHeight={25}
                        rowsPerPageOptions={[100]}
                        getRowId={row => Math.random()}
                        columnVisibilityModel={sm ? hideColPhone : hideCol}
                        onCellDoubleClick={clickedCell}
                        onColumnVisibilityModelChange={(newModel) => sm ? setHideColPhone(newModel) : setHideCol(newModel)}
                    />   
                </Box>                          
            :null}
        </>
    )
}

export default SearchResults

        /***
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
    } */