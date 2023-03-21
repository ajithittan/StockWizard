import Badge from '@mui/material/Badge';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import {getUserNotifications} from '../modules/api/UserPreferences'
import { useEffect, useState } from 'react';
import BadgeNotificationContent from './BadgeNotificationContent'
import { Transform } from '@mui/icons-material';

const BadgeNotification = () => {

    const [notifications, setNotifications] = useState(null)
    const [openDetails, setOpenDetails] = useState(false)

    useEffect(async () =>{
        let retval = await getUserNotifications("ALL")
        if (retval && retval.length > 0 ){
            setNotifications([...retval])
        }
    },[])

    const openNotifications = () =>{
        openDetails ? setOpenDetails(false) : setOpenDetails(true)
    }

    return (
            <>
                <Badge onClick={openNotifications} badgeContent={notifications ? notifications.length : 0 } color="secondary" style={{cursor: 'pointer'}}>
                    <NotificationsActiveIcon color="white" onClick={openNotifications}/>
                </Badge>
                {openDetails ? <BadgeNotificationContent key={notifications+openDetails} open={openDetails} content={notifications} closedNotifications={() => setOpenDetails(false)}/> : null}
            </>
    );
}

export default BadgeNotification