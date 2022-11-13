import { Button } from "@mui/material"
import { useState } from "react"
import ModalBox from '../../components/ModalBox'
import ListFeatures from './ListFeatures'

const FeatureSelection = (props) =>{
    const [showModal, setshowModal] = useState(false)
    const [features, setFeatures] = useState(null)

    const openNewPositionsModal = () =>{
        setshowModal(true)
    }

    const processFeatures = (inpFeatures) =>{
        setFeatures(inpFeatures)
        props.selectFeatures(inpFeatures)
        setshowModal(false)
    }

    const getContent = () =>{
        return <ListFeatures newFeatures={processFeatures} features={features}/>
    }

    return (
        <>  
            <Button  variant="contained" size="small" pt={2} onClick={openNewPositionsModal}>Add Features</Button>
            {showModal ? <ModalBox content={getContent()}  onClose={() => setshowModal(false)}></ModalBox> : null }
        </>    
    )

}

export default FeatureSelection