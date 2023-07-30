import { useEffect, useState } from "react"
import useMediaQuery from '@mui/material/useMediaQuery';
import Grid from '@mui/material/Grid';

const Container = (props) =>{

    const [components,setComponents] = useState(null)

    const sm = useMediaQuery("(max-width: 960px)");
    
    useEffect(() =>{
        if (props.components) {
            setComponents(props.components)
        }
    },[])

    return(
      <div style={{marginLeft:"5vh",marginTop:"10px",marginRight:"5vh",marginBottom:"5vh"}}>  
            <Grid container spacing={2} direction="row" justify="center" alignItems="stretch">
                <Grid item md={12} lg={12} xl={12} sm={12} xs={12}>          
                    {components ? <>{components[0]}</> : null}
                </Grid>
                <Grid item md={12} lg={12} xl={12} sm={12} xs={12}>
                  <div>
                      {components ? <>{components[1]}</> : null}
                  </div>
                </Grid>
                <Grid item md={12} lg={12} xl={12} sm={12} xs={12}>
                  <Grid style={{ height: "100%" }}>
                      {components ? <>{components[2]}</> : null}
                  </Grid>
                </Grid>
              </Grid>
      </div>
    )
}

export default Container