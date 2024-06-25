import { useEffect } from "react"
const ForceSimulation = (props) =>{

    useEffect(() =>{
        console.log("chartdata",props.chartdata)
    },[props.chartdata])

    return(
        <div>loading the chart.....</div>
    )
}

export default ForceSimulation