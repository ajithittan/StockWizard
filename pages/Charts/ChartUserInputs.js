import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { useEffect, useState } from "react"
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Button,TextField } from "@mui/material"
import Grid from '@mui/material/Grid';
import { CardHeader } from "@mui/material"
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import CloseIcon from '@mui/icons-material/Close';
import {makeStyles} from '@mui/styles';
import {saveStockPositions} from '../../modules/api/UserPreferences'
import cloneDeep from 'lodash/cloneDeep';

const ChartUserInputs = (props) =>{

    const sm = useMediaQuery("(max-width: 960px)");
    const [referenceData, setreferenceData] = useState(null)
    const [btnDisabled,setbtnDisabled] = useState(true)

    useEffect(() =>{
      if (props.referData){
        let tempsetup = cloneDeep(props.referData)
        setreferenceData(tempsetup)
      }
    },[props.referData])

    let cardStyle = {
      display: 'block',
      width: sm ? "90%" : "60vh", 
      transitionDuration: '0.3s',
      margin: '5px',
      paddingLeft: sm ? "5%" : "1px",
      backgroundColor: "white",
      color:'text.secondary',
      alignItems:"center",
      //border: stkDetail && stkDetail.perchange.toFixed(2) > 0 ? "1px solid green" : "1px solid red"
    }
    const useStyles = makeStyles({
      header: ({ sm }) => ({
        color: 'text.secondary',
        fontFamily: 'cursive',
        fontSize: 9,
      })
    });

    const classes = useStyles({ sm });

    const savePositionsToDb = async () =>{
      let res = await saveStockPositions(referenceData)
    }

    const updateInputs = (type,newVal) =>{
      let tempvals = referenceData
      tempvals[type] = newVal
      setreferenceData(tempvals)
      if (tempvals && tempvals.close && tempvals.position){
        console.log("enabling button")
        setbtnDisabled(false)
      }else{
        setbtnDisabled(true)
      }
    }

    return (
        <Card style={cardStyle}>
          <CardHeader
              //className={classes.header}
              title={referenceData ? "Activity - " + referenceData.date : null}
          />
        <CardContent>
          <Grid
              container 
              spacing={2}
              padding={2}
            >
            <Grid> 
              {referenceData ? 
              <TextField style = {{width: 150}} id="outlined-basic" label="Price" variant="outlined" 
                      size="small" defaultValue={referenceData.close} type="number" required
                      onChange={(e) => updateInputs("close",e.target.value)}></TextField> 
              : null}
            </Grid>
            <Grid>              
              <TextField style = {{width: 150}} id="outlined-basic" label="Position"  type="number" required
                        variant="outlined" size="small" onChange={(e) => updateInputs("position",e.target.value)}></TextField>
            </Grid>
            <Grid>                                  
              <Button style = {{width: 100}} variant="contained" disabled={btnDisabled}
                        size="medium" pt={1} onClick={savePositionsToDb}>Save</Button>
            </Grid>                       
          </Grid>
          <CardActions>
                <IconButton aria-label="delete">
                    <DeleteIcon onClick={() => {
                                                  props.remove(props.referData.close);
                                                  props.closeModal(false)
                                                  }
                                          }/>
                </IconButton>
                <IconButton aria-label="notify">
                    <NotificationsActiveIcon></NotificationsActiveIcon>
                </IconButton>
                <IconButton aria-label="notify">
                    <CloseIcon onClick={() => props.closeModal(false)}></CloseIcon>
                </IconButton>
          </CardActions>
        </CardContent>
      </Card>
    )
}
export default ChartUserInputs
