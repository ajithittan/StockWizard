import { Button } from "@mui/material"
import { useState } from "react"
import ProcessNewPositions from './ProcessNewPositions'
import ModalBox from '../../components/ModalBox'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useDispatch} from 'react-redux'
import {updPortfolioStocks} from '../../redux/reducers/portfolioStockSlice'

const AddPositions = (props) =>{
    const dispatch = useDispatch()
    const [showModal, setshowModal] = useState(false)
    const [stocksel,setStockSel] = useState(null)

    const openNewPositionsModal = () =>{
        setshowModal(true)
    }

    const saveNewPositions = () => {setshowModal(false),dispatch(updPortfolioStocks(stocksel))}

    const getContent = () =>{
        return <ProcessNewPositions initialSetOfStocks={props.initialSetOfStocks} updates={setStockSel}/>
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
                    Add Stocks in your portfolio
                </Typography>
                <CardActions>
                    <Button  variant="contained" onClick={openNewPositionsModal}>Add Stocks</Button>
                </CardActions>
                </CardContent>
            </Card>  
            {showModal ? <ModalBox content={getContent()} onClose={saveNewPositions}></ModalBox> : null }
        </>    
    )
}

export default AddPositions