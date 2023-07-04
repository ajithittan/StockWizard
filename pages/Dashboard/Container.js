import { useEffect, useState } from "react"
//import {makeStyles} from  "@mui/system";
import useMediaQuery from '@mui/material/useMediaQuery';
import Grid from '@mui/material/Grid';


const Container = (props) =>{

    const [components,setComponents] = useState(null)

    const sm = useMediaQuery("(max-width: 960px)");

    const useStyles = ({
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
      })

      const mainLeft = () => ({
        //backgroundColor: "white",'
        marginLeft:sm ? "15vh" : "15vh",
        marginRight:sm ? "15vh" : "15vh",
        marginTop:sm ? "5vh" : "5vh",
        height: sm ? "80vh" : "80vh",
        marginBottom: sm ? "5vh" : "5vh",
      })

      const mainRight = () => ({
        backgroundColor: "white",
        height: sm ? "90vh" : "90vh",
        marginTop: sm ? "5vh" : "20px",
        marginRight: sm ? "5vh" : "20px",
        marginLeft: sm ? "5vh" : "20px"
      })

    useEffect(() =>{
        if (props.components) {
            setComponents(props.components)
        }
    },[])

    //const classes = useStyles({ sm });

    return(
      <>  
            <Grid container direction="row" sx={{marginBottom:"10vh"}}>
                <Grid item md={9} lg={9} xl={9} sm={12} xs={12}>             
                <div style={{marginRight:"15vh",height: sm ? "80vh" : "50vh",marginLeft:"15vh",marginTop:"5vh",marginBottom:"5vh"}}>
                    {components ? <>{components[0]}</> : null}
                </div>
                <div>
                    {components ? <>{components[1]}</> : null}
                </div>
                </Grid>
                <Grid item md={3} lg={3} xl={3} sm={12} xs={12}>
                <div style={{height:"90vh",marginLeft: sm ? "5vh" : "20px",marginTop: sm ? "5vh" : "20px",marginRight: sm ? "5vh" : "20px"}}>
                    {components ? <>{components[2]}</> : null}
                </div>
                </Grid>
              </Grid>
      </>
    )
}

export default Container