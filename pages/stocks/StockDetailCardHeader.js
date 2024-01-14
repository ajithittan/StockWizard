import { useEffect } from 'react'
import {useSelector,shallowEqual} from 'react-redux'

const StockDetailCardHeader = (props) => {

    const streamdata = useSelector(state => state.streamingquotes?.streamdata?.find(m=> {
        return m.symbol === props.stock
    }), shallowEqual)

    return (
        <>
            {props.stock}&nbsp;-&nbsp;
            {
                streamdata ? streamdata?.close + " (" + streamdata?.perchange?.toFixed(2)  + "%)" : "Looking.."  
            }
        </>
    )
}

export default StockDetailCardHeader