import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from "react"

const DispPatternsFormed = (props) =>{

    const [patterns,setPatterns] = useState(props.patterns)

    const getColorForPattern = () => {
        if(patterns.length > 2 && props.textcolor){
            return "blue"
        } else {
            return "text.secondary"
        }
    }

    const normalizePattern = inpPatterns => inpPatterns.toString()

    return (
            patterns?.map(eachpattern =>
                <Grid xs justify = "center">
                        <Grid container direction='row'>
                            <Grid xs justify = "center">
                                <Typography color={getColorForPattern()} variant="caption">{eachpattern.type}</Typography>
                            </Grid>
                            <Grid xs justify = "center">
                                <Typography color={getColorForPattern()} variant="caption">{normalizePattern(eachpattern.bullishpatterns)}</Typography>
                            </Grid>                            
                    </Grid>                                                     
                </Grid>
            )
    )
}

export default DispPatternsFormed