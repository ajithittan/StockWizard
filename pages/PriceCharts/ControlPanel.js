import { useEffect, useState } from 'react' 
import Duration from '../../components/Duration'
import SimpleMovAvg from './SimpleMovAvg'
import PredictionModels from './PredictionModels'

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

    const handleModelChanges = (value,name) =>{
        props.onChanges("PM",value,name)
    }
    
    return(
        <> 
          <div className= {showContent ? "ControlpanelPriceOpen" : "ControlpanelPrice"} onMouseEnter={() => setshowContent(true)}>
            {showContent ? 
                <>
                <div style={{textAlign:"center",width:"100%",color:"whitesmoke"}}>{props.stock}</div>
                <br></br>
                <Duration changedval={handleDurChanges} dur={initDur} ></Duration>  
                <br></br><br></br>
                <SimpleMovAvg onsmachange={handleSmaChanges}/>
                <br></br><br></br>
                <PredictionModels stock={props.stock} onpredictionchange={handleModelChanges}></PredictionModels>
                </>
            : null}
          </div>
        </>
    )
    
}

export default ControlPanel