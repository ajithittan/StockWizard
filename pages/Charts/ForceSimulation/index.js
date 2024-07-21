import { useEffect } from "react"
import BubblesChart from './BubblesChart'
const ForceSimulation = (props) =>{

    useEffect(() =>{
        console.log("chartdata",props.chartdata)
    },[props.chartdata])

    return(
        <BubblesChart nodes={props.chartdata}></BubblesChart>
    )
}

export default ForceSimulation