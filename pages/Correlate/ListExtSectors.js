import { useEffect, useState } from "react"
import Chip from '@mui/material/Chip';
import {getExternalSectorsAndStocks} from '../../modules/api/Sectors'

const ListExtSectors = (props) =>{
    const [lstSects, setLstSects] = useState(null)

    useEffect(() =>{
        getExternalSectorsAndStocks().then(retval => 
            {
                console.log("sectors",retval)
                setLstSects(retval)
            }
             
        )
    },[])                

    return (
        <>
        {
            lstSects?.map(eachChip =>
                <Chip label={eachChip.sector} variant="outlined" color="primary" clickable={true} 
                            onClick={ () => props.onselect(eachChip.stocks) } />
            )
        }
        </>
    )
}

export default ListExtSectors


