import {useEffect, useState} from 'react'
import {Box} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment';

const JobStatus = () =>{

    const [count,setCount] = useState(100)
    const [jobInf,setJobInf] = useState(null)

    useEffect(() =>{
        let eventSource = undefined
        eventSource = new EventSource('/stream/alljobs/' + String(count))
        eventSource.onmessage = e => {
           var jobdata = JSON.parse(e.data)
           jobdata ? setJobInf(jobdata) : null
          }
        eventSource.onerror = (e) => {
            console.log("Errrrrrr",e);
        };   
        return () => eventSource?.close()
    },[])

    const getDtTmDisp = (inpval) => moment(inpval).format('MM-DD-YYYY HH:mm:ss')

    const getMoreInfo = (inpval) =>{
        var keys = Object.keys(inpval);
        let arr = keys.map(item => item + ":" + inpval[item])
        return "(" + arr.toString() + ")"
    }

    const columns = [
        {field: 'fn', headerName: 'Job', headerAlign: 'center',align:'center',flex: 1 },
        {field: 'st', headerName: 'Start' , headerAlign: 'center',align:'center', flex: 1 , renderCell: (params) => getDtTmDisp(params.value)},
        {field: 'et', headerName: 'End' , headerAlign: 'center',align:'center', flex: 1 , renderCell: (params) => getDtTmDisp(params.value)},
        {field: 'tt', headerName: 'Time Taken(s)' , headerAlign: 'center',align:'center', flex: 1 },
        {field: 'rv', headerName: 'More Info' , headerAlign: 'center', minWidth: 500, flex: 1 ,renderCell: (params) => getMoreInfo(params.value)},
    ];

    return (
        <>
        {
            jobInf?
            <Box sx={{height:"90vh",width:"100%"}}>
            <DataGrid
                density="compact"
                rows={jobInf}
                columns={columns}
                pageSize={15}
                rowsPerPageOptions={[15]}
                getRowId={row => Math.random()}
            />   
            </Box> : null 
        }
        </>
    )
}

export default JobStatus