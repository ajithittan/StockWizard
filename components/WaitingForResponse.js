import myGif from "../public/loading-loading-forever.gif"
import Image from 'next/image';
import { useEffect, useState } from "react";

const WaitingForResonse = (props) =>{

    const [position,setPosition] = useState(null)

    useEffect(() =>{
        
    },[props.position])

    return (
        <div style={{position:"relative",top:"50%",left:"50%"}}><Image src={myGif} alt="wait" height={props.height || 100} width={props.width || 100} /></div>
    )
}

export default WaitingForResonse