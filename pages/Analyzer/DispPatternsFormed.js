import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {useState } from "react"

const DispPatternsFormed = (props) =>{

    const [patterns,setPatterns] = useState(props.patterns)

    const getColorForPattern = () => {
        if(patterns.length > 2 && props.textcolor){
            return "blue"
        } else {
            return "text.secondary"
        }
    }

    const stripDown = (inpval) =>{
        const strippedvals = {middle:"M",lower:"L"}
        if (strippedvals[inpval])
        return strippedvals[inpval]
        else if (inpval.indexOf( "CrossOver" ) > -1) {
            return "CO-" + inpval.split('-')[1]
        }else if (inpval.indexOf( "CDL" ) > -1) {
            return inpval.split('CDL')[1]
        }
        else{
            return inpval
        }
    }

    const normalizePattern = inpPatterns => {
        let strippedArr = []
        inpPatterns?.forEach(element => {
            strippedArr.push(stripDown(element.toString()))
        });
        return strippedArr.toString()
    }

    return (
            patterns?.map(eachpattern =>
                <Grid xs justify = "center" margin={0.2}>
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