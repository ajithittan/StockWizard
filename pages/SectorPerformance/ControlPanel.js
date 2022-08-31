import { useEffect, useState } from 'react' 
import Duration from '../../components/Duration'

const ControlPanel = (props) =>{

    const [initDur,setinitDur] = useState(null)
    const [showContent,setshowContent] = useState(false)

    useEffect(() =>{
        if (props.initialsetup){
            console.log("ControlPanel",props.initialsetup.duration)
            setinitDur(props.initialsetup.duration)
        }
    },[props.initialsetup])

    const handleDurChanges = (dur) =>{
        setinitDur(dur)
        props.onChanges("duration",dur)
    }
    
    return(
        <> 
          <div className= "Controlpanel" onMouseEnter={() => setshowContent(true)} onMouseLeave={() => setshowContent(false)}>
            {showContent ? <Duration changedval={handleDurChanges} dur={initDur} ></Duration> : null}
          </div>
            
        </>
    )
    
}

export default ControlPanel