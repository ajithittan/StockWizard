import MultiLineChart from './MultiLineChart';
import ControlPlane from './ControlPlane'
import { useState } from 'react';

const index = () => {

    const [duration,setDuration] = useState(12)
    console.log("durationdurationdurationduration",duration)

    return (
        <div class="flex-container">
            <div class="flex-child magenta">
                <MultiLineChart key={duration} dur={duration}/>
            </div>
            <div class="flex-child green">
                <ControlPlane onChangeDuration={setDuration}/>
            </div>
        </div>
    )
}

export default index