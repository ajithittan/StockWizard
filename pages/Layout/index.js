import { getLocationOrigin } from 'next/dist/shared/lib/utils'
import { useEffect, useState } from 'react'
import LineChart from '../Charts/LineChart'
import { useRouter } from 'next/router'

const index = () =>{
    const [stocks,setStocks] = useState(null)
    const router = useRouter()
    const margin = {top: 20, right: 20, bottom: 30, left: 50}

    useEffect(() =>{
      let listOfstks = ["AAPL","AMZN","BE","QS","AMD","WKSP","C","TSLA"]
      let qryParamStk = router.query.stock
      if (qryParamStk){
        listOfstks[listOfstks.indexOf(qryParamStk)] = listOfstks[0]
        listOfstks[0] = qryParamStk
        setStocks([...listOfstks])
      }
      else{
        setStocks(listOfstks)
      }
    },[])

    const swapFirstPlace = (stk) =>{
      stocks[stocks.indexOf(stk)] = stocks[0]
      stocks[0] = stk
      setStocks([...stocks])
    }

    return (
        <div id="outer-grid">
          {
            stocks ? <div><LineChart key={stocks[0]} width={1240} height={800} margin={margin} stock={stocks[0]} />?</div> : <p>getting......</p>
          }
        <div id="inner-grid">
          {
            stocks ? stocks.slice(1).map(eachStk => <div><LineChart key={eachStk} width={300} height={200} margin={margin} stock={eachStk} swap={swapFirstPlace} /></div>) : <p>getting......</p>
          }
          
        </div>
      </div>
    )
}
export default index