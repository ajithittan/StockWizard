import Checkbox from '@mui/material/Checkbox';
import {updUserWatchList} from '../../redux/reducers/profileDashSlice'
import { useSelector, useDispatch,shallowEqual} from 'react-redux'
import { useEffect, useState } from 'react';

const DispPatternTrack = (props) => {
    const [checked,setChecked] = useState(false)
    const dispatch = useDispatch()

    const watchedstk = useSelector(state => state.dashboardlayout?.watchlist?.find(m=> {
        return m === props.stock
    }))

    useEffect(() =>{
        if(watchedstk){
            setChecked(true)
        }
    },[watchedstk])

    const handleChange = () =>{
        if (!checked){
            dispatch(updUserWatchList([props.stock]))
            setChecked(true)
        }else{
            setChecked(false)
        }
    }

    return (
        <Checkbox checked={checked} size="small" label="Watchlist" onChange={handleChange}/>
    )

}

export default DispPatternTrack