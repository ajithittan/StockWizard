import { Button } from "@mui/material"
import { useEffect, useState} from 'react'
import SearchAssist from './SearchAssist'

const SearchItems = (props) =>{

    const [query,setQuery] = useState([])

    useEffect(() =>{
        console.log("queryqueryqueryqueryquery",query)
        if(query && query.length > 0){
            props.onsetquery(query)
        }
    },[query])

    const queryBuilder = (tp,param,val,op) =>{
        let bldqry = {}
        bldqry["type"] = tp
        bldqry["param"] = param
        bldqry["val"] = val
        bldqry["op"] = op
        setQuery(initalval => [bldqry])
    }

    return(
        <>
            {
                /**
                    <Button variant="outlined" size="small" pt={1} onClick={() => queryBuilder("rsi",14,80,">") } >RSI above 80</Button>&nbsp;&nbsp;
                    <Button variant="outlined" size="small" pt={1} onClick={() => queryBuilder("rsi",14,30,"<") } >RSI below 30</Button>&nbsp;&nbsp;
                    <Button variant="outlined" size="small" pt={1} onClick={() => queryBuilder("close",0,"SMA_200",">") }>Close above 200 day MA</Button>&nbsp;&nbsp;
                    <Button variant="outlined" size="small" pt={1} onClick={() => queryBuilder("close",14,"SMA_50","<") }>Close below 50 day MA</Button>&nbsp;&nbsp;
                    <Button variant="outlined" size="small" pt={1} onClick={() => queryBuilder("perchange",0,5,">") }>5% and Above Moves</Button>&nbsp;&nbsp;                 
                 */
            }
            <SearchAssist addToQuery={setQuery}></SearchAssist>
        </>
    )
}

export default SearchItems