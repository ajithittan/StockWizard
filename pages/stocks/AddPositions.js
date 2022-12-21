import { Button } from "@mui/material"
import { useState } from "react"
import ProcessNewPositions from './ProcessNewPositions'
import ModalBox from '../../components/ModalBox'

const AddPositions = (props) =>{
    const [showModal, setshowModal] = useState(false)

    const openNewPositionsModal = () =>{
        setshowModal(true)
    }
    const successToDB = () =>{
        setshowModal(false)
    }

    const getContent = () =>{
        return <ProcessNewPositions onceSuccess={successToDB} />
    }

    return (
        <>  
            <Button  variant="contained" sx={{height:20}} onClick={openNewPositionsModal}>+</Button>
            {showModal ? <ModalBox content={getContent()}  onClose={() => setshowModal(false)}></ModalBox> : null }
        </>    
    )

}

export default AddPositions