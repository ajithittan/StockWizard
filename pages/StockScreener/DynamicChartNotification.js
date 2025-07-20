import {Box} from '@mui/material';
import { useEffect, useState , forwardRef} from 'react'
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

const DynamicChartNotification = forwardRef((props,ref)=>{

    const [notifications,setNotifications] = useState([])

    useEffect(() =>{
        if(props.notification){
            setNotifications(props.notification.message)
        }
    },[props.notification])

    const handlehover =(e) =>{
        console.log("eeeeee",e.target.animationPlayState)
    }

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