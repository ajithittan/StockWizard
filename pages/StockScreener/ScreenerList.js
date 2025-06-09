import { useState,useEffect } from "react"

const ScreenerList = (props) => {
    const [scrList, setScrList] = useState(null)
    const staticList = [
        {label:'High Volume',datasource:'fngetsomething',format: {type:'linechart',xAxisLabel:'date', yAxisLabel:'close'}}
    ]
    useEffect(() =>{
        props.onselect(staticList)
    },[])
    return (
        <></>
    )
}

export default ScreenerList