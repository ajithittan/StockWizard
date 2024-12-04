import { useEffect, useState} from 'react'
import {getSearchResults} from '../../modules/api/StockIndicators'
import {Box} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import WaitingForResonse from '../../components/WaitingForResponse'
import useMediaQuery from '@mui/material/useMediaQuery';
import Chip from '@mui/material/Chip';
import {getConciseValuesForLargeNums} from '../../modules/utils/UtilFunctions'
import {useSelector,useDispatch} from 'react-redux'
import {ADD_TO_AUTO_FILL,ADD_QUERY_TO_SEARCH} from '../../redux/reducers/stockSearchAdvSlice'
import SearchBottomContainer from './SearchBottomContainer'
import {updUserWatchList} from '../../redux/reducers/profileDashSlice'
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

const SearchResults = (props) =>{
    const dispatch = useDispatch()
    const sm = useMediaQuery("(max-width: 1200px)");
    const [results,setResults] = useState(null)
    const [waiting,setWaiting] = useState(false)
    const [hideCol,setHideCol] = useState(null)
    const [hideColPhone,setHideColPhone] = useState(null)
    const [columns,setColumns] = useState([]);
    const [density,setDensity] = useState("compact")
    const {searchquery} = useSelector((state) => state.stocksearchddv)

    useEffect(() =>{
        if(searchquery && searchquery.length >0){
            setWaiting(true)
            let finalQuery = {}
            finalQuery["search"] = searchquery.map(item => item.query)
            getSearchResults(finalQuery).then(output => { 
                if(output?.length > 0){
                    setResults(output),setWaiting(false),extractColumns(output[output.length - 1]),resetColumns(finalQuery["search"])
                }else{
                    setWaiting(false)
                }
            })
        }
    },[searchquery])

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

    const getIconForAction = (field) =>{
        if (field === "symbol"){
            return (row) => <>{row["row"]["symbol"]}&nbsp;
                <PlaylistAddIcon sx={{cursor:"pointer",marginLeft:"auto"}} 
                    onClick={() => addWatchList(row["row"]["symbol"])} />
            </>
        }
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
            tempFieldObj["renderCell"]=getIconForAction(item)
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
                <>
                    {
                        arrcols?.map(key => {
                            if (!cols[key]){
                                return (
                                    <Chip
                                    marginLeft={1.2}
                                    variant={"outlined"}
                                    label={key}
                                    color= {"primary"}
                                    size={sm ? "small" : "small"}
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
                </>
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
            dispatch(ADD_QUERY_TO_SEARCH(query))
            dispatch(ADD_TO_AUTO_FILL(query)) 
        }
    }

    const addWatchList = (stk) => dispatch(updUserWatchList([stk]))

    return(
        <>
            {waiting ? <WaitingForResonse></WaitingForResonse> : null}
            {results ? 
                <>
                <Box sx={{height:"100%",width: "98vw"}} margin={0.5}>         
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
                {props.selected === "COLS" ? <SearchBottomContainer component={getHiddenColumns()}/> : null}
                </>               
            :null}
        </>
    )
}

export default SearchResults