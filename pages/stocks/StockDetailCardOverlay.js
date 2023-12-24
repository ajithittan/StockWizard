import { useState } from 'react'
import DurationPicker from '../../components/Charting/DurationPicker'

const StockDetailCardOverlay = (props) => {

    const changeDuration = (dur) => props.callbackduration(dur)

    return (
            <DurationPicker width="90%" size="small" ondurchange={changeDuration}></DurationPicker>
    )

}

export default StockDetailCardOverlay