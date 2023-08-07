import { useEffect, useState } from "react"
import useMediaQuery from '@mui/material/useMediaQuery';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

const Container = (props) =>{

    const [components,setComponents] = useState(null)

    useEffect(() =>{
        if (props.components) {
            setComponents(props.components)
        }
    },[props.components])

    return(
      <div style={{marginLeft:"5vh",marginTop:"10px",marginRight:"5vh",marginBottom:"5vh"}}>  
          <Grid container display="flex" spacing={2} direction="row" justify="center" alignItems="stretch">
              {
                components?.map (eachComp =>{
                    let widthOfGrid = 12/eachComp.components.length;
                    return eachComp.components.map(listOfItems => 
                      <Grid key={widthOfGrid+listOfItems.key} item md={widthOfGrid} lg={widthOfGrid} xl={widthOfGrid} sm={12} xs={12}>          
                          {listOfItems.props.header?
                            <Paper component="fieldset"
                                  elevation={0} sx={{height: "100%" }}>
                                  <legend align="center" ><h4>&nbsp;&nbsp;{listOfItems.props.header}&nbsp;&nbsp;</h4></legend>
                                  {listOfItems}
                            </Paper> : 
                            <Paper elevation={0} sx={{height: "100%"}}>
                                  {listOfItems}
                            </Paper>
                          }
                      </Grid>
                    )
                  }
                )
              }
            </Grid>
      </div>
    )
}

export default Container