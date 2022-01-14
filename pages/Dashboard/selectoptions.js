import { useEffect, useState } from "react"
import dashboardmaster from '../../modules/dashboardmaster'
import {useAppSkinContext} from '../../modules/state/GlobalSkinState'

const SelectOptions = () =>{

    const [data,setData] = useState(dashboardmaster)
    const [skinVal,changeSkinVal] = useAppSkinContext()

    return(
        <>
            {
                
                data ? 
                data["stockfeed"].map (eachitem => (
                    <>
                    <div id={eachitem.Id} className={"draggable drag-drop drag-drop_" + skinVal.header}><p>{eachitem.type}</p></div>
                    <div className='horizontal-row'></div>
                    </>
                ))
                : null
            }
            {
                
                data ? 
                data["newsfeed"].map (eachitem => (
                    <>
                    <div id={eachitem.Id} className={"draggable drag-drop drag-drop_" + skinVal.header}><p>{eachitem.type}</p></div>
                    <div className='horizontal-row'></div>
                    </>
                ))
                : null
            }
            
        </>
    )
}

export default SelectOptions