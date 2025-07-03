import {forwardRef } from "react"
import Paper from '@mui/material/Paper';

const RenderFieldSet = forwardRef((props,inpref) =>{

    
    return (
        <Paper component="fieldset" elevation={0} ref={inpref}>
            <legend align="center"><h4>&nbsp;&nbsp;<a href={() =>setDisplayHide(true)}>Intra Day Stock Patterns</a>&nbsp;&nbsp;</h4></legend>
            {props.comp}
      </Paper>
    )

})

export default (RenderFieldSet)