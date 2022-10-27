import { useEffect, useState } from 'react' 
import Duration from '../../components/Duration'
import SimpleMovAvg from './SimpleMovAvg'

const ControlPanel = (props) =>{

    const [initDur,setinitDur] = useState(null)
    const [showContent,setshowContent] = useState(false)

    useEffect(() =>{
        if (props.initialsetup){
            setinitDur(props.initialsetup.duration)
        }
    },[props.initialsetup])

    const handleDurChanges = (dur) =>{
        setinitDur(dur)
        props.onChanges("duration",dur)
    }

    const handleSmaChanges = (value) =>{
        props.onChanges("sma",value)
    }
    
    return(
        <> 
          <div className= "ControlpanelPrice" onMouseEnter={() => setshowContent(true)} onMouseLeave={() => setshowContent(false)}>
            {showContent ? 
                <>
                <div style={{textAlign:"center",width:"100%",color:"whitesmoke"}}>{props.stock}</div>
                <br></br>
                <Duration changedval={handleDurChanges} dur={initDur} ></Duration>  
                <br></br><br></br>
                <SimpleMovAvg onsmachange={handleSmaChanges}/>
                </>
            : null}
          </div>
        </>
    )
    
}

export default ControlPanel