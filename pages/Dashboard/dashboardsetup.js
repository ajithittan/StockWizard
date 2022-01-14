import {useAppSkinContext} from '../../modules/state/GlobalSkinState'
import { useEffect } from 'react'
import Router from 'next/router'
import SelectOptions from './selectoptions'
import DragandDrop from '../../modules/utils/draganddrop'

const DashboardSetUp = ()=>{

    //const [positions,setPositions] = useState({draggable1:{ x: 0, y: 0 },draggable2:{ x: 0, y: 0 }})
    const [skinVal,changeSkinVal] = useAppSkinContext()
    const selectOpts = new Set()

    useEffect(() =>{
        DragandDrop(addToOpts,removeFromOpts)
    })

    const addToOpts = (id) =>{
        selectOpts.add(id)
    }
    const removeFromOpts = (id) =>{
        selectOpts.delete(id)
    }

    const saveDashBoardOption = () =>{
        console.log("selectOpts",selectOpts)
        if (selectOpts.size == 0){
            console.log('print error message')
        }else{
            localStorage.setItem("dashboard",JSON.stringify([...selectOpts]))
        }
    }

    const reset = () =>{
        localStorage.removeItem("dashboard")
        Router.reload()
    }

    return (
        <div className='parent'>
            <div className={"dropzone wide dropzone_"+skinVal.header}>
                <p>Drag and drop sections to be added to your dashboard...</p>
                <input type="button" value="Save" onClick={() =>saveDashBoardOption()}></input>
                <input type="button" value="Reset" onClick={() => reset() }></input>
            </div>
            <div className='vertical-row'></div>
            <div className='narrow'>
                <SelectOptions />
            </div>
        </div>
    )

}

export default DashboardSetUp