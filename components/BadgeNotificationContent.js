import { useEffect, useState } from 'react';
import useComponentVisible from './useComponentVisible'
import {Box} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

const BadgeNotificationContent = (props) => {
    const [content,setContent] = useState(null)
    const closeDiv = () => props.closedNotifications()
    const { ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(props.open,closeDiv);
    const arrType = {1:"Price",2:"SMA"}

    useEffect(() =>{
        setIsComponentVisible(props.open)
    },[props.open])

    useEffect(() =>{
        if (props.content){
            let retval = formatDataForDisplay(props.content)
            setContent([...retval])
        }
    },[props.content])

    const formatDataForDisplay = (inpData) => inpData.map(item => ({ ...item, 
        displayType: getMappedType(item.notificationtype)}))

    const getMappedType = (alertTp) => arrType[alertTp] || alertTp

    const getIconForDisPlay = (inpVal) => {
        console.log("inpVal",inpVal)
        if (inpVal.includes("+")){
            return <><TrendingUpIcon style={{ color: '#adf802' }}></TrendingUpIcon><span>{inpVal}</span></>
        }else if (inpVal.includes("-")){
            return <><TrendingDownIcon style={{ color: 'red' }}></TrendingDownIcon><span>{inpVal}</span></>
        }

    }

    const columns = [
        {field: 'symbol', headerName: 'Stock', headerAlign: 'center',width:70},
        {field: 'notifcationmessage', headerName: 'Alert' , headerAlign: 'center', minWidth: 300, 
                            renderCell: (params) => getIconForDisPlay(params.value)},
    ];

    return (
       <div ref={ref} >
          {isComponentVisible && (
            <div className="BadgeNotificationsContent">
                {content ? 
                    <Box sx={{height:"100%",width:"100%"}}>
                        <DataGrid
                            density="compact"
                            disableColumnMenu
                            rows={content}
                            columns={columns}
                            pageSize={15}
                            rowsPerPageOptions={[15]}
                            getRowId={row => Math.random()}
                        />   
                    </Box>                          
                :null}
            </div>
          )}
       </div>
    );
} 

export default BadgeNotificationContent