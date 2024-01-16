import NotificationsIcon from '@mui/icons-material/Notifications';
import IconButton from '@mui/material/IconButton';
import {addItemsToChart,HIDE_ADDED_ITEMS_IN_CHART} from '../../../redux/reducers/chartDataSlice'
import {useDispatch,useSelector,shallowEqual} from 'react-redux'
import { useState } from 'react';

const PriceAlerts = (props) =>{
    const dispatch = useDispatch()
    const [clicked,setClicked] = useState(false)
    
    const stockAlerts = useSelector((state) => state.stockalerts?.stockalerts?.find(m=> {
        return m.symbol === props.stock
    }), shallowEqual)

    return (
        <>
            {
                clicked ? <IconButton aria-label="reset">
                            <NotificationsIcon  color={stockAlerts?.alerts?.length > 0 ? "primary" : "secondary"} 
                            onClick={() => {dispatch(HIDE_ADDED_ITEMS_IN_CHART(stockAlerts?.alerts)),setClicked(false)}}/>
                        </IconButton> : 
                        <IconButton aria-label="reset">
                            <NotificationsIcon  color={stockAlerts?.alerts?.length > 0 ? "primary" : "secondary"} 
                            onClick={() => {
                                dispatch(addItemsToChart({type:"ALERT",data:stockAlerts?.alerts}));
                                if (stockAlerts?.alerts?.length > 0){
                                    setClicked(true)
                                }
                            }}/>
                        </IconButton>
            }    
        </>
    )
}

export default PriceAlerts