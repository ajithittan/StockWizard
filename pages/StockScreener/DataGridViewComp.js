import {useEffect, useState} from "react"
import {Box} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import useMediaQuery from '@mui/material/useMediaQuery';
import ShowChartIcon from '@mui/icons-material/ShowChart';

const DataGridViewComp = (props) =>{
    const sm = useMediaQuery("(max-width: 1200px)");
    const [hideCol,setHideCol] = useState([])
    const [hideColPhone,setHideColPhone] = useState([])
    const [rowData,setRowData] = useState(null)
    const [unDispCols,setUnDispCols] = useState(null)
    const [cols,setCols] = useState(null)
    const [inpStyle,setInpStyle] = useState(props.style)
    const [columns,setColumns] = useState([]);

    useEffect(() =>{
        if(props.jsonData){
            setRowData(props.jsonData)
            if (props.columnsDisp){
                setColums(props.jsonData,props.columnsDisp)
            }
        }
    },[props.jsonData,props.columnsDisp])

    const formatheader = (inpval) => inpval.replace("pattern_int_","").toUpperCase(); 

    const hideColumns = (inpcols) =>{
        let tempObj={}
        for(let i=0;i<inpcols.length;i++){
            tempObj[inpcols[i]["field"]]=false
        }
        sm ? setHideColPhone(tempObj): setHideCol(tempObj)
    }

    const selectColumnsToDisplay = (allColumns) =>{
        let colArr = sm ? allColumns.slice(inpStyle?.cntmobcols): allColumns.slice(inpStyle?.cntcols)
        hideColumns(colArr)
    }

    //make this generic move this to the caller.
    const getIconForAction = (field) =>{
        if (field === "symbol"){
            return (row) => <>{row["row"]["symbol"]}&nbsp;
                <ShowChartIcon sx={{cursor:"pointer",marginLeft:"auto"}} 
                    onClick={() => handleClick(row["row"]["symbol"])} />
            </>
        }
    }

    //make this generic move this to the caller.
    const handleClick = (val) => {
        const actionval = {action:'transitionact',value:val}
        props.actions(actionval)
      }

    const setColums = (inpData,colsTodisp) =>{
        let arrCols = []
        const headers = Array.from(
            new Set(inpData?.flatMap((obj) => Object.keys(obj)))
        );
        colsTodisp.map(item =>{
            let col = {field: item, variant:"contained", headerName: formatheader(item), headerClassName: 'super-app-theme--header', align:'left' , 
                        headerAlign: 'left', flex: 1, renderCell:getIconForAction(item)}
            arrCols.push(col)
        })
        let remaincols = headers.filter(item => !colsTodisp.includes(item))
        remaincols.map(item =>{
            let col = {field: item, variant:"contained", headerName: formatheader(item) , align:'center' , headerClassName: 'super-app-theme--header',headerAlign: 'left', flex: 1 }
            arrCols.push(col)
        })
        setColumns([...arrCols])
        selectColumnsToDisplay(arrCols)
    }

    //make it generic these clicks
    const clickedCell = (rowvals) => {
        const colsToAct = ['sector','pattern_']
        if (colsToAct.filter(item => rowvals['field'].includes(item)).length > 0){
            let qryval = rowvals["formattedValue"]
            if (Array.isArray(rowvals["formattedValue"])){
                qryval = rowvals["formattedValue"][0]
            }
            let query = {label: rowvals['field'] + " " + qryval, query:{type:rowvals['field'],param:0,op:"contains",val:qryval}}
            //dispatch(ADD_QUERY_TO_SEARCH(query))
            //dispatch(ADD_TO_AUTO_FILL(query)) 
        }
    }

    //make it generic these clicks
    const handleCellDoubleClick = (params) => {

        let tempval = columns.map(item => ({
            ...item, 
            hide: item["field"] === params["field"] ? true : false 
          }));
        //setColumns([...tempval]);
        //setHideColPhone(initval => [...initval,item["field"]])
        //setHideCol(initval => {
        //    initval[params["field"]] = true
        //    return initval
        //})    
      };

    return (
        <Box 
        sx={{height:"100vh"}}>   
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
                    initialState={{
                        density: inpStyle?.density,
                    }}
                    headerHeight={30} 
                    rows={rowData || []}
                    columns={columns || []}
                    pageSize={100}
                    rowHeight={25}
                    rowsPerPageOptions={[100]}
                    getRowId={row => Math.random()}
                    columnVisibilityModel={sm ? hideColPhone : hideCol}
                    onCellDoubleClick={clickedCell}
                    onColumnHeaderDoubleClick={handleCellDoubleClick}
                    onColumnVisibilityModelChange={(newModel) => sm ? setHideColPhone(newModel) : setHideCol(newModel)}
                />   
        </Box>  
        )
}

export default DataGridViewComp