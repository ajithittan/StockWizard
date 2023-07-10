import {useEffect, useState } from "react"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import DeleteIcon from '@mui/icons-material/Delete';
import StockSymbolSelector from '../../components/StockSymbolSelector'
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';

const Sector = (props) =>{

    let sectorObj = props.details
    let [name,setName] = useState(sectorObj?.sector)
    let [stocks,setStocks] = useState(sectorObj?.stocks)
    let id = sectorObj?.idstocksector

    useEffect(() =>{
        if(props.details){
            setName(props.details.sector)
            setStocks(props.details.stocks)
        }
    },[props.details])

    let cardStyle = {
        height:"90%",
        transitionDuration: '0.3s',
        marginLeft: "10px",
        marginTop: "10px",
        paddingLeft: "5px",
        color:'text.secondary',
        alignItems:"center",
        backgroundColor: "#FAF9F6"
    }

    const updStks = (updatedStks) => {
        setStocks(updatedStks)
        sectorObj.stocks = Array.from(new Set(updatedStks))
        props.update(sectorObj)
    }

    const updName = (e) => {
        setName(e.target.value.toUpperCase())
        sectorObj.sector=e.target.value.toUpperCase()
        setTimeout(() => sendToDb(),3000)
    }

    const sendToDb = () => props.update(sectorObj)

    return (
        <>
            <Card style={cardStyle}>
                <CardContent>
                    <div style={{height:"90%"}}>
                    <TextField inputProps={{style: {fontWeight:"bold"}}} InputLabelProps={{shrink: false}} 
                               id="standard-basic" variant="standard" value={name} onChange={updName}/>           
                        <StockSymbolSelector key={stocks} limitToShow={4} width={250} updates={updStks} initialset={stocks || []} />
                    </div>
                    <CardActions>
                        <IconButton aria-label="delete">
                            <DeleteIcon onClick={() => props.remove(id)} />
                        </IconButton>
                    </CardActions>
                </CardContent>
            </Card>
        </>   
    )
}

export default Sector