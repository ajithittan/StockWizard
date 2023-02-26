import { useEffect, useState } from "react"
import {makeStyles} from '@mui/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Grid from '@mui/material/Grid';


const Container = (props) =>{

    const [components,setComponents] = useState(null)

    const useStyles = makeStyles({
        mainLeft: ({ sm }) => ({
          //backgroundColor: "white",'
          marginLeft:sm ? "15vh" : "15vh",
          marginRight:sm ? "15vh" : "15vh",
          marginTop:sm ? "5vh" : "5vh",
          height: sm ? "80vh" : "50vh",
          marginBottom: sm ? "5vh" : "5vh",
        }),
        mainRight: ({ sm }) => ({
            backgroundColor: "white",
            height: sm ? "90vh" : "90vh",
            marginTop: sm ? "5vh" : "20px",
            marginRight: sm ? "5vh" : "20px",
            marginLeft: sm ? "5vh" : "20px"
        }),
        Bottom: ({ sm }) => ({
          backgroundColor: "white",
          height: sm ? "90vh" : "500px",
          padding:"10px"
        })
      });

    useEffect(() =>{
        if (props.components) {
            setComponents(props.components)
        }
    },[])

    const sm = useMediaQuery("(max-width: 960px)");
    const classes = useStyles({ sm });

    return(
      <>  
            <Grid container direction="row" sx={{marginBottom:"10vh"}}>
                <Grid item md={9} lg={9} xl={9} sm={12} xs={12}>             
                <div className={classes.mainLeft}>
                    {components ? <>{components[0]}</> : null}
                </div>
                <div>
                    {components ? <>{components[1]}</> : null}
                </div>
                </Grid>
                <Grid item md={3} lg={3} xl={3} sm={12} xs={12}>
                <div className={classes.mainRight}>
                    {components ? <>{components[2]}</> : null}
                </div>
                </Grid>
              </Grid>
      </>
    )
}

export default Container