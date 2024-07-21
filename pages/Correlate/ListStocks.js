import { useState } from "react"
import Chip from '@mui/material/Chip';

const ListStocks = (props) =>{
    const [lstStks, setLstStks] = useState([{label:"Nvidia",value:"NVDA"},{label:"AMD",value:"AMD"},
                {label:"Citigroup",value:"C"},{label:"Bank Of America",value:"BAC"},{label:"Intel",value:"INTC"}])

    return (
        <>
        {
            lstStks?.map(eachChip =>
                <Chip label={eachChip.label} variant="outlined" color="primary" clickable={true} 
                            onClick={ () => props.onselect(eachChip.value) } />
            )
        }
        </>
    )
}

export default ListStocks