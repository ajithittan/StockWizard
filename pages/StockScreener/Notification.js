import React, { useState } from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader'
import Divider from '@mui/material/Divider';
import SnoozeIcon from '@mui/icons-material/Snooze';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import ViewListTwoToneIcon from '@mui/icons-material/ViewListTwoTone';
import Badge from '@mui/material/Badge';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

const Notification = (props) => {
  const [isVisible, setIsVisible] = useState(props.visible);


  let cardStyle = {
    position:'fixed',
    bottom:'20px',
    right: '20px',
    transitionDuration: '0.3s',
    backgroundColor: '#f0f0f0',
    color:'text.secondary',
    alignItems:"center",
    borderRadius:'5px',
    zIndex: 1000,
    display:'flex',
    justifyContent: 'space-between'
    }

  const handleClose = () => setIsVisible(false);

  const showNewUpdates = () => {props.onclickshow(),handleClose()}
  
  if (!isVisible) {
    return null;
  }

  return (
    <Card style={cardStyle}>
        <CardContent>  
            <Badge style={{cursor:"pointer"}} badgeContent={props.message} color="secondary" >
                <NotificationsActiveIcon color="blue" onClick={showNewUpdates}/>
            </Badge>
            &nbsp;&nbsp;
            <Badge>
            <SnoozeIcon onClick={handleClose} style={{cursor:"pointer"}}></SnoozeIcon>
            </Badge>
        </CardContent>
  </Card>
  );
};

export default Notification;