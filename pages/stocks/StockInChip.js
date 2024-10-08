import { useEffect, useState } from "react";
import DoneIcon from '@mui/icons-material/Done';
import Chip from '@mui/material/Chip';
import {updUserWatchList} from '../../redux/reducers/profileDashSlice'
import { useSelector, useDispatch,shallowEqual} from 'react-redux'

const StockInChip = (props) =>{

    const [stockdtls,setStockDtls] = useState(null)

    useEffect(() =>{
        if(props.details){
            setStockDtls(props.details)
        }
    },[props.details])

    const dispatch = useDispatch()

    const watchedstk = useSelector(state => state.dashboardlayout?.watchlist?.find(m=> {
        return m === stockdtls?.stock
    }))

    const getChipComponent = (inpLabel,inpVal,stock) =>{
        const getColor = {"positive":"#EAFFF1","negative":"#FFEAE9"}
        return (
            <>
                <Chip
                    variant="outlined"
                    deleteIcon={watchedstk ? <DoneIcon /> : null}
                    label={inpLabel}
                    size="small"
                    sx={{
                        backgroundColor:inpVal >=0 ? getColor["positive"] : getColor["negative"],
                        color:'text.secondary', margin:props.margin
                    }}
                    onClick={ () => dispatch(updUserWatchList([stock])) } 
                    onDelete={watchedstk ? () =>{} : null}
                />
            </>
        )
    }


    return (
        <>
            {getChipComponent(stockdtls?.stock,stockdtls?.close,stockdtls?.stock)}
        </>
    )
}

export default StockInChip