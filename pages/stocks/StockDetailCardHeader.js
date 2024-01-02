import { isEqual } from 'lodash';
import {useSelector} from 'react-redux'

const StockDetailCardHeader = (props) =>{

    const {streamdata} = useSelector(state => state.streamingquotes)
    
    const gettitle = () => 
    <>
    {   
        props.stock ? 
        (streamdata ? streamdata?.filter(dtls => dtls.symbol === props.stock)[0]?.close || 0.00 : "Looking..") + 
        (streamdata ? " (" + (streamdata?.filter(dtls => dtls.symbol === props.stock)[0]?.perchange?.toFixed(2) || 0.0) + "%)"  : "..") : "Looking"
    }
    </>

    return (
        <>
            {props.stock}&nbsp;-&nbsp;{gettitle()}
        </>
    )
}

export default StockDetailCardHeader