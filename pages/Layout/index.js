import {useAppSkinContext} from '../../modules/state/GlobalSkinState'
import { useEffect, useState } from 'react'
import LineChart from '../Charts/LineChart'
import { useRouter } from 'next/router'
import {useAppContext} from '../../modules/state/stockstate'

const index = () =>{
    const [stocks,setStocks] = useState(null)
    const [skinVal,changeSkinVal] = useAppSkinContext()
    const router = useRouter()
    const margin = {top: 20, right: 0, bottom: 30, left: 50}
    const [width, setWidth]   = useState(0);
    const [height, setHeight]   = useState(0);
    const stklist = useAppContext()

    useEffect(() => {
          const calcWidth = () =>{
            //Can this be moved to css? Not happy at all!
            if (window.innerWidth > 1300){
              setWidth(window.innerWidth - 400);
            } else if (window.innerWidth > 1000 && window.innerWidth < 1300) {
              setWidth(window.innerWidth - 400);
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
      let listOfstks = router.query.list
      let qryParamStk = router.query.stock

      if (qryParamStk){
        if (listOfstks){
          listOfstks[listOfstks.indexOf(qryParamStk)] = listOfstks[0]
          listOfstks[0] = qryParamStk
          setStocks([...listOfstks])  
        }else{
          setStocks([qryParamStk])  
        }
      }
      else{
        setStocks(listOfstks)
      }
    },[stklist])

    const swapFirstPlace = (stk) =>{
      stocks[stocks.indexOf(stk)] = stocks[0]
      stocks[0] = stk
      setStocks([...stocks])
    }

    return (
        <>
        <div></div>
        <div id="outer-grid">
          {
            stocks && width > 0 ? <div><LineChart key={Math.round(width) + stocks[0]}  width={Math.round(width)} height={Math.round(height*.90)} margin={margin} stock={stocks[0]} main={true} /></div> : <p>getting......</p>
          }
          <div className={"inner-grid" + " " + skinVal.header} >
            {
              stocks && width > 0 ? stocks.slice(1).map(eachStk => <div><LineChart key={eachStk} width={300} height={200} margin={margin} stock={eachStk} swap={swapFirstPlace} main={false}/></div>) : <p>getting......</p>
            }        
          </div>
        </div>
        </>
    )
}
export default index