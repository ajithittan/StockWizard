import { useState} from 'react'
import StockSymbolSelector from '../../components/StockSymbolSelector'
import ViewOfFacts from './ViewOfFacts'

const Company = () =>{

    let [selStk,setSelStk] = useState(null)
    let label = "All"

    const selStock = (stk) => setSelStk(stk[0])
    
    return (
        <div style={{width:"80%", marginLeft:"10%",marginTop:"1%"}}>
            <StockSymbolSelector updates={selStock} noSelections={true}></StockSymbolSelector>
            {selStk ? <ViewOfFacts key={selStk} stock={selStk} /> : null }
        </div>
    )
}

export default Company