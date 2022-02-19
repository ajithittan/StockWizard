import { useState } from 'react'
import {UpdateStockPrice} from '../modules/api/StockMaster'

const StockPriceSyncer = () =>{

    const [syncing,setSyncing] = useState(false)

    const syncStkData = async () =>{
        setSyncing(true)
        UpdateStockPrice().then(response => setSyncing(false))
    }

    return (
        <>
            <input type="button" name="Stock Sync" value="Stock Sync" onClick={() => syncStkData()} />
            {
                syncing ? <div style={{color:'whitesmoke'}}>syncing....</div> : <div style={{color:'whitesmoke'}}>synched....</div>
            }
        </>
    )

}

export default StockPriceSyncer