import {Box} from '@mui/material';
import { useEffect, useState , forwardRef} from 'react'
import Typography from '@mui/material/Typography';

const DynamicChartNotification = forwardRef((props,ref)=>{

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
            <div className="marquee-container">
                <div className="marquee-content">
                {
                    notifications.map(item => 
                            <Typography variant="overline" >
                                &nbsp;{item.label} - {item.dateime}&nbsp;|
                            </Typography>
                        )
                }
          </div>
          </div>
        </Box>
        </>
    )
})

export default DynamicChartNotification