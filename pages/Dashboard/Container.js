import { useEffect, useState } from "react"
import {makeStyles} from '@mui/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Grid from '@mui/material/Grid';


const Container = (props) =>{

    const [components,setComponents] = useState(null)

    const useStyles = makeStyles({
        mainLeft: ({ sm }) => ({
          //backgroundColor: "white",
          height: sm ? "90vh" : "500px",
          marginTop: sm ? "5vh" : "40px",
          marginLeft: sm ? "5vh" : "40px",
          marginRight: sm ? "5vh" : "60px"
        }),
        mainRight: ({ sm }) => ({
            backgroundColor: "white",
            height: sm ? "90vh" : "550px",
            overflow:"auto",
            marginTop: sm ? "5vh" : "20px",
            marginRight: sm ? "5vh" : "20px"
        }),
        Bottom: ({ sm }) => ({
          backgroundColor: "white",
          height: sm ? "90vh" : "500px",
          padding:"10px"
        })
      });

    useEffect(() =>{
        console.log(props.components)
        if (props.components) {
            setComponents(props.components)
        }
    },[])

    const sm = useMediaQuery("(max-width: 960px)");
    const classes = useStyles({ sm });

    return(
      <>  
          <div>
            <Grid container direction="row">
                <Grid item md={10} lg={10} xl={10} sm={12} xs={12}>
                <div className={classes.mainLeft}>
                    {components ? <>{components[0]}</> : null}
                </div>
                </Grid>
                <Grid item md={2} lg={2} xl={2} sm={12} xs={12}>
                <div className={classes.mainRight}>
                    {components ? <>{components[2]}</> : null}
                </div>
                </Grid>
                <Grid item md={11.9} lg={11.9} xl={11.9} sm={12} xs={12}>
                <div className={classes.Bottom}>
                    {components ? <span>{components[1]}</span> : null}
                </div>
                </Grid>
            </Grid>
        </div>
      </>
    )
}

export default Container