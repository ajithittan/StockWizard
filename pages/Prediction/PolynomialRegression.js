import { useEffect, useState } from "react"
import {TextField} from "@mui/material"

const PolynomialRegression = (props) =>{

    const [polyDegreeRange, setpolyDegreeRange] = useState(null)
    const [polyDegree, setpolyDegree] = useState(null)
    const [disable,setDisable] = useState(true)
    const [returnParams,setreturnParams] = useState(null)

    useEffect(() =>{
        let retval = {}
        if(disable){
            retval.Type="degree"
            retval.Val=polyDegree
        }else{
            retval.Type="degreerange"
            retval.Val=polyDegreeRange
        }
        setreturnParams(retval)
    },[polyDegreeRange,polyDegree])

    const sendParams = () =>{
        if (returnParams && returnParams.Val && parseInt(returnParams.Val) !== 0){
            props.additionalParams([returnParams])
        }
    }

    return (
        <>
            <TextField id="outlined-basic" label="Degree" variant="outlined" size="small" 
                       disabled={disable ? false : true} onChange={(e) => setpolyDegree(e.target.value)} 
                       onClick={() => {setDisable(true);(e) => e.target.value=null;setpolyDegreeRange(null)}} 
                       onBlur={sendParams}>{polyDegree}</TextField>                       
            <TextField id="outlined-basic" label="Degree Range" variant="outlined" size="small" 
                       disabled={disable} onChange={(e) => setpolyDegreeRange(e.target.value)} 
                       onClick={() => {setDisable(false);(e) => e.target.value=null;setpolyDegree(null)}} 
                       onBlur={sendParams}>{polyDegreeRange}</TextField>
        </>
    )
}

export default PolynomialRegression