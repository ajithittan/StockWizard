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
    },[props.components])

    return(
      <div style={{marginLeft:"5vh",marginTop:"10px",marginRight:"5vh",marginBottom:"5vh"}}>  
          <Grid container display="flex" spacing={2} direction="row" justify="center" alignItems="stretch">
              {
                components?.map (eachComp =>{
                    let widthOfGrid = 12/eachComp.components.length;
                    return eachComp.components.map(listOfItems => 
                      <Grid key={widthOfGrid+listOfItems.key} item md={widthOfGrid} lg={widthOfGrid} xl={widthOfGrid} sm={12} xs={12}>          
                          {listOfItems}
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