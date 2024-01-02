import { useState } from 'react'
import DurationPicker from '../../components/Charting/DurationPicker'

const StockDetailCardOverlay = (props) => {

    const changeDuration = (dur) => props.callbackduration(dur)

    const getContent = (type) => {
        const retVal = {
            "Basic": <DurationPicker width="90%" size="small" ondurchange={changeDuration} color="steelblue"></DurationPicker>
        }
        return retVal[type]       
    }

    return (
        <>
            {getContent(props.type)}
        </>
            
    )

}

export default StockDetailCardOverlay