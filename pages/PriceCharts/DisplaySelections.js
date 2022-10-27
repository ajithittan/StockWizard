import { useEffect, useState } from 'react' 
import MultiLineThemes from '../../modules/themes/MultiLineThemes'

const DisplaySelections = (props) =>{

    const [selections,setSelections] = useState(null)

    useEffect(() =>{
        console.log("rops.selections",props.selections)
        if(props.selections){
            setSelections(props.selections)
        }
    },[])

    const removeFromList = (indx) =>{
        console.log(selections[indx])
        props.adjSelections(selections[indx].key,selections[indx].value)
    }

    return(
        <> 
          <div className= "ChartSelections">
            {
                selections ? 
                    selections.map((item,indx) => <div style={{color:MultiLineThemes[indx+1]}} className="ChartSelectionsDiv" onClick={() => removeFromList(indx)} title="Remove" >
                            {item.key.toUpperCase()}-{item.value}&nbsp;&nbsp;&nbsp;</div>) : null
            }
          </div>
        </>
    )
    
}

export default DisplaySelections