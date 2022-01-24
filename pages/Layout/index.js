import {useAppSkinContext} from '../../modules/state/GlobalSkinState'
import { useEffect, useState } from 'react'
import LineChart from '../Charts/LineChart'
import { useRouter } from 'next/router'

const index = () =>{
    const [stocks,setStocks] = useState(null)
    const [skinVal,changeSkinVal] = useAppSkinContext()
    const router = useRouter()
    const margin = {top: 20, right: 0, bottom: 30, left: 50}
    const [width, setWidth]   = useState(0);
    const [height, setHeight]   = useState(0);

    useEffect(() => {
          const calcWidth = () =>{
            //Can this be moved to css? Not happy at all!
            if (window.innerWidth > 1300){
              setWidth(window.innerWidth - 700);
            } else if (window.innerWidth > 1000 && window.innerWidth < 1300) {
              setWidth(window.innerWidth - 350);
            }
              else{
              setWidth(window.innerWidth);
            }
          }
          if (width === 0){
            calcWidth();
            setHeight(window.innerHeight);
          }
          const updateDimensions = () => {
            calcWidth();
            console.log(window.innerHeight)
            setHeight(window.innerHeight);  
        }
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

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
            stocks && width > 0 ? <div><LineChart key={Math.round(width) + stocks[0]}  width={Math.round(width)} height={Math.round(height*.90)} margin={margin} stock={stocks[0]} /></div> : <p>getting......</p>
          }
        <div className={"inner-grid" + " " + skinVal.header} >
          {
            stocks && width > 0 ? stocks.slice(1).map(eachStk => <div><LineChart key={eachStk} width={300} height={200} margin={margin} stock={eachStk} swap={swapFirstPlace} /></div>) : <p>getting......</p>
          }
          
        </div>
      </div>
    )
}
export default index