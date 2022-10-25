import { useEffect, useState } from 'react' 
import Duration from '../../components/Duration'
import SimpleMovAvg from './SimpleMovAvg'

const ControlPanel = (props) =>{

    const [initDur,setinitDur] = useState(null)
    const [showContent,setshowContent] = useState(false)
    const [sma,setSma] = useState(null)

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
        let objsma = {sma:value}
        if (sma){
            sma.filter(item => item.sma ===value).length === 0 ? setSma([...sma,objsma]) : null
        }else{
            setSma([objsma])
        }
    }
    
    return(
        <> 
          <div className= "ControlpanelPrice" onMouseEnter={() => setshowContent(true)} onMouseLeave={() => setshowContent(false)}>
            {showContent ? 
                <>
                <div style={{alignItems:"center"}}>AAPL</div>
                <br></br>
                <Duration changedval={handleDurChanges} dur={initDur} ></Duration>  
                <br></br><br></br>
                <SimpleMovAvg key={sma} onsmachange={handleSmaChanges} initalsma={sma}/>
                </>
            : null}
          </div>
        </>
    )
    
}

export default ControlPanel