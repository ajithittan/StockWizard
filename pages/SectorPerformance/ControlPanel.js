import { useEffect, useState } from 'react' 
import Duration from '../../components/Duration'

const ControlPanel = (props) =>{

    const [initDur,setinitDur] = useState(null)

    useEffect(() =>{
        if (props.initialsetup){
            setinitDur(props.initialsetup.duration)
        }
    },[props.initialsetup])

    const handleDurChanges = (dur) =>{
        setinitDur(dur)
        props.onChanges("duration",dur)
    }
    
    return(
        <> 
          <div className="ControlPanelDiv">
            <Duration changedval={handleDurChanges} dur={initDur}></Duration>
          </div>
        </>
    )
    
}

export default ControlPanel