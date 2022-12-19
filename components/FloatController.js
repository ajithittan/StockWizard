import { useState,useEffect } from "react"

const FloatController = (props) => {

    const [showMin,setShowMin] = useState(true)
    const [styleOfDiv,setStyleofDiv] = useState({})

    useEffect(() =>{
        if(props.styl){
            setStyleofDiv(props.styl)
        }
    },[])

    useEffect(() => {
        const handleEsc = (event) => {
           if (event.keyCode === 27) {
            setShowMin(true)
          }
        };
        window.addEventListener('keydown', handleEsc);
    
        return () => {
          window.removeEventListener('keydown', handleEsc);
        };
      }, []);

    const takeAction = () =>{
        if (showMin){
            setShowMin (false)
        }else{
            setShowMin (true)
        }
    }

    return (
        <>
            {
                showMin ? 
                    <div className="FloatController" onClick={() => takeAction()}></div> : 
                    <div className="FloatControllerDiv" style={{...styleOfDiv}}>
                        <a href="#" title="close" className="CloseFloatController" onClick={takeAction}>&#10060;</a>
                        {props.content}
                    </div>
            }
        </>
    )

}

export default FloatController