import {Box} from '@mui/material';
import { useEffect, useState} from 'react'
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

const DynamicChartNotification = (props)=>{

    const [notifications,setNotifications] = useState([])

    useEffect(() =>{
        if(props.notification){
            setNotifications(props.notification.message)
        }
    },[props.notification])

    return(
        <>
        <Box sx={{
            height: 30,
            borderRadius: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>   
            <Typography variant="body2" >
                {props.symbol}&nbsp;&nbsp;&nbsp;
            </Typography>
            {
                notifications.map(item => 
                        <Typography variant="overline" >
                            &nbsp;{item.label} - {item.dateime}&nbsp;|
                        </Typography>
                    )
            }
            
        </Box>
        <Divider></Divider>
        </>
    )
}

export default DynamicChartNotification