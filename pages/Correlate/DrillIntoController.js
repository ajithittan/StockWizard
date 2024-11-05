import { useEffect, useState } from "react";
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import { useDispatch} from 'react-redux'
import {SET_SELECT_STOCKS} from '../../redux/reducers/chartDrillSlice'

const DrillIntoController = (props) =>{
    const dispatch = useDispatch()
    const [allStks,setAllStks] = useState(null)
    const [selectStks,setSelectStks] = useState([])

    useEffect(() =>{
        if(props.stocks){
            setAllStks(props.stocks)
        }
    },[props.stocks])

    useEffect(() =>{
        if(selectStks){
            dispatch(SET_SELECT_STOCKS(selectStks))
        }
    },[selectStks])

    const addToList = (stk) =>{
        if(selectStks.includes(stk)){
            setSelectStks([...selectStks.filter(item => item !== stk)])
        }else{
            setSelectStks(initialval => [...initialval,stk])
        }
    }

    return (

        <>
            {
                allStks?.map(eachStk => 
                    <Chip
                        variant={selectStks.includes(eachStk)? "filled" : "outlined"}
                        label={eachStk} 
                        size="small"
                        sx={{
                            backgroundColor: selectStks.includes(eachStk) ? "lightblue" : "white",
                            color:'text.secondary', margin:props.margin
                        }}
                        onClick={() => addToList(eachStk)} 
                    />)
            } 
            <Divider></Divider>
        </>
    )
}

export default DrillIntoController