import { useEffect, useState } from "react"
import {getPatternsForStock} from '../../modules/api/StockPatterns'

const StockPatterns = (props) =>{

    const [patterns,setPatterns] = useState(null)

    useEffect(() =>{
        if(props.stock){
            getPatternsForStock(props.stock).then(retval => {
                if (retval.length > 0){
                    setPatterns(retval)
                    }
                }
            )
        }
    },[props.stock])

    const getPattern = (inpPattern) =>{ 

        return (
            <div>
            <>{inpPattern.stock}</> | <>{inpPattern.type}</> <> {inpPattern.bullishpatterns.map(item => <>{item}</>)} </>
            </div>
        )
    }

    return(
        <>
        <>{patterns ? getPattern(patterns[0]) : null}</>
        </>
    )

}

export default StockPatterns