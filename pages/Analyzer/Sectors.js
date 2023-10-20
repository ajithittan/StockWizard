import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { useEffect, useState } from "react"
import IconButton from '@mui/material/IconButton';
import ExpandIcon from '@mui/icons-material/Expand';
import useMediaQuery from '@mui/material/useMediaQuery';
import CardHeader from '@mui/material/CardHeader'

const Sectors = (props) => {
    const [stkQuote,setStkQuote] = useState(null)
    const [sector,setSector] = useState(null)
    const [type,setType] = useState("Basic")
    const sm = useMediaQuery("(max-width: 960px)");

    let cardStyle = {
        height:"90%",
        transitionDuration: '0.3s',
        transitionDuration: '0.3s',
        marginTop: sm ? "10px" : "15px",
        backgroundColor: stkQuote?.perchange?.toFixed(2) > 0 ? "#F5FEF8" :"#FFF8F9",
        color:'text.secondary',
        alignItems:"center",
    }

    useEffect(() => {
        if(props.sector){
            setSector(props.sector)
        }
    },[props.sector])

    const getContent = () => {
        let retVal = {}
        return retVal[type]
    }

    return (
      <Card style={cardStyle}>
          <CardHeader title={sector}/>
        <CardContent>
          <div style={{height:"90%"}}>
              {getContent()}
          </div>
          <CardActions>
                <IconButton aria-label="reset">
                    <ExpandIcon onClick={() => setType("Basic")} />
                </IconButton>
          </CardActions>
        </CardContent>
      </Card>
    );
  }

export default Sectors
