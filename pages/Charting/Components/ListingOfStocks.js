import { useEffect, useState } from 'react'
import {useAppContext} from '../../../modules/state/stockstate'

const ListingOfStocks = () => {

    const stklist = useAppContext()
    const [chkBoxStats,setchkBoxStats] = useState()
    
    const handleOnChange = () =>{
        
    }

    return(
        <>
        {
            stklist ? stklist.sort((a,b) => a > b).map(
                (item,index) => <div style={{paddingTop:'10px'}}>
                            <input
                            type="checkbox"
                            id={"chk" + index}
                            name={item}
                            value={item}
                            checked={true}
                            onChange={handleOnChange}
                            />
                            {item}
                    </div>
            ) : null
        }
        </>
    )

}
export default ListingOfStocks