import { useState,useEffect } from 'react'
import WaitingForResonse from '../../components/WaitingForResponse'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import BarChart from '../Charts/BarChart'
import IconButton from '@mui/material/IconButton';
import DatasetIcon from '@mui/icons-material/Dataset';
import DashboardIcon from '@mui/icons-material/Dashboard';

const CompanyFacts = (props) =>{
    const [compFacts,setCompFacts] = useState(null)
    const [waiting,setWaiting] = useState(false) 
    const [quarter,setQuarter] = useState(false)
    const margin = {top: 5, right: 5, bottom: 10, left: 15}

    useEffect (() =>{
        if(props.facts){
            setCompFacts(props.facts)
        }
    },[props.facts])

    useEffect(() =>{
        console.log("props.quarter",props.quarter)
        if (props.quarter) {setQuarter(props.quarter)}
    },[props.quarter])

    const columns = [
        { field: '', headerName: 'Actions', width: 100,renderCell: (row) => addToDashboard(row,quarter)},
        { field: 'label', headerName: 'Type', width: 300},
        { field: 'units', headerName: 'units', width: 300 , renderCell: (row) => renderDetailsButton(row,quarter)},
        { field: 'description', headerName: 'Description', width: 500}
      ];

    const getBarChart = (inpData,period) =>{
        let chartdata = formatToFitChart(inpData,period)
        if (chartdata.length > 0 ){
            return <BarChart data={chartdata} margin={margin}></BarChart>
        }else{
            return null
        }     
    }  

    const addToDashboard = (row) =>{
        return (
            <>
                <IconButton aria-label="Add To Dashboard">
                    <DashboardIcon onClick={() => console.log("addToDashboard",row)} />
                </IconButton>
            </>
        )
    }

    const getDataSet = (row) =>{
        return (
            <IconButton aria-label="Add To Dashboard">
                <DatasetIcon onClick={() => console.log("addToDashboard",row)} />
            </IconButton>
        )

    }

    const formatToFitChart = (inpData,period) =>{
        let extData = []
        let retval = []
        if(period){
            extData = inpData.filter(each => each.form === "10-Q")
        }else{
            extData = inpData.filter(each => each.form === "10-K")
        }
        if (extData.length > 0){
            for(let i=0; i < extData.length ; i++){
                let tempData = {}
                if (period){
                    tempData.xAxis = extData[i].quarter.slice(0,2) + "'" + extData[i].year % 100
                }
                else{
                    tempData.xAxis = "'" + extData[i].year % 100
                }
                tempData.yAxis1 = extData[i].val
                retval.push(tempData)
            }
        }else{
            console.log("data is not matching",inpData,period)
        }
        console.log("retval",retval)
        return retval
    }

    const renderDetailsButton = (row,period) =>{
        if(props.category==="Others"){
            return(
                <>
                    {getDataSet(row)}
                </>
            )
        }
        else if (row.row.units.USD && row.row.units.USD.length > 0){
            return(
                <div style={{marginBottom:"15%",marginTop:"5%",marginLeft:"5%"}}>
                    {getBarChart(row.row.units.USD,period)}
                </div>
            )
        }
        else if (row.row.units["USD/shares"] && row.row.units["USD/shares"].length > 0){
            return(
                <div style={{marginBottom:"15%",marginTop:"5%",marginLeft:"5%"}}>
                    {getBarChart(row.row.units["USD/shares"],period)}
                </div>
            )            
        }
        else{
            return "NA"
        }
    }  
    return (
        <>
                {
                    waiting ? <WaitingForResonse /> : null
                }
                <br></br>
                {compFacts ? 
                    <Box sx={{ height: '70vh', width: '100%'}}>
                        <DataGrid
                            getRowHeight={() => 'auto'}
                            rows={compFacts}
                            columns={columns}
                            initialState={{
                                pagination: {
                                paginationModel: {
                                    pageSize: 500,
                                },
                                },
                            }}
                            pageSizeOptions={[5]}
                            disableRowSelectionOnClick
                            getRowId={row => Math.random()}/>
                    </Box>
                    :null
                }
        </>
    )
}

export default CompanyFacts