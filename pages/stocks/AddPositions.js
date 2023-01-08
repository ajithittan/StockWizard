import { Button } from "@mui/material"
import { useState } from "react"
import ProcessNewPositions from './ProcessNewPositions'
import ModalBox from '../../components/ModalBox'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

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

    let cardStyle = {
        display: 'block',
        width: '50vw',
        transitionDuration: '0.3s',
        height: '50vw',
        margin: '5px',
        maxHeight: '170px',
        maxWidth: '300px',
    }

    return (
        <>
            <Card style={cardStyle}>
                <CardContent>
                <Typography color="text.secondary">
                    Add Stocks you wish to track
                </Typography>
                <CardActions>
                    <Button  variant="contained" onClick={openNewPositionsModal}>Add Stocks</Button>
                </CardActions>
                </CardContent>
            </Card>  
            {showModal ? <ModalBox content={getContent()}  onClose={() => setshowModal(false)}></ModalBox> : null }
        </>    
    )
}

export default AddPositions