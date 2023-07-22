import { Button } from "@mui/material"
import { useState } from "react"
import ProcessNewPositions from './ProcessNewPositions'
import ModalBox from '../../components/ModalBox'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import {SaveNewPositions} from '../../modules/api/StockMaster'

const AddPositions = (props) =>{
    let symbols = []
    const [showModal, setshowModal] = useState(false)

    const openNewPositionsModal = () =>{
        setshowModal(true)
    }

    const saveNewPositions = async () => {
        setshowModal(false)
        if (symbols && symbols.length > 0){
            symbols = Array.from(new Set([...symbols]))
            SaveNewPositions(symbols).then(retval => {
                if (retval){
                    props.actionAdd(symbols)
                }
            })
        }
    }

    const addStks = (stock) => symbols = stock

    const getContent = () =>{
        return <ProcessNewPositions initialSetOfStocks={props.initialSetOfStocks} addStks={addStks}/>
    }
    const sm = useMediaQuery("(max-width: 960px)");

    let cardStyle = {
        display: 'block',
        height: sm ? "50%" : "150px",
        width: sm ? "50%" : "200px", 
        transitionDuration: '0.3s',
        marginLeft: sm ? "10px" : "30px",
        marginTop: sm ? "10px" : "15px",
        paddingLeft: sm ? "5%" : "1px",
        backgroundColor: "white",
        color:'text.secondary',
        alignItems:"center",
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
            {showModal ? <ModalBox content={getContent()}  onClose={saveNewPositions}></ModalBox> : null }
        </>    
    )
}

export default AddPositions