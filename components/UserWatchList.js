import { useEffect} from "react";
import {useDispatch,useSelector} from 'react-redux'
import {getUserWatchList} from '../redux/reducers/profileDashSlice'

const UserWatchList = (props) =>{
    const dispatch = useDispatch()

    const {watchlist} = useSelector(state => state.dashboardlayout)

    useEffect(() =>{
        if(!watchlist){
            getWatchListForUser()
        }
    },[watchlist])

    const getWatchListForUser = async () => dispatch(getUserWatchList())

    return (
        <></>
    )
}

export default UserWatchList