import PatternIcon from '@mui/icons-material/Pattern';
import IconButton from '@mui/material/IconButton';
import {useSelector,shallowEqual} from 'react-redux'

const LatestPatternsFormed = (props) =>{
    
    const stkPatterns = useSelector((state) => state.stockpatterns?.stockpatterns?.find(m=> {
        return m.symbol === props.stock
    }), shallowEqual)

    return (
        <>
            <IconButton aria-label="Stock Patterns">
                <PatternIcon color={stkPatterns?.stockpatterns?.length > 0 ? "primary" : "secondary"}  
                        onClick={() => props.onshowpatterns("StkPtrns")} />                        
            </IconButton>                     
        </>
    )
}

export default LatestPatternsFormed