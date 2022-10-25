import { useEffect, useState } from 'react'
import LineChart from '../Charts/LineChart'
import { useRouter } from 'next/router'
import myGif from '../../public/loading-loading-forever.gif'
import ControlPanel from './ControlPanel'
import getStockPriceHist from '../../modules/cache/cacheprice'
import {getRollingSMA} from '../../modules/api/StockIndicators'
import Image from 'next/image';

const index = () =>{
    const initDur = 3
    const router = useRouter()
    const stock = router.query.stock
    const margin = {top: 20, right: 0, bottom: 30, left: 50}
    const [width, setWidth]   = useState(0);
    const [height, setHeight]   = useState(0);
    const [actContPanel,setactContPanel] = useState(false)
    const [initialSetUp,setinitialSetUp] = useState({duration:initDur})
    const [charData,setcharData] = useState(null)

    useEffect(() => {
          const calcWidth = () =>{
            //Can this be moved to css? Not happy at all!
            if (window.innerWidth > 1300){
              setWidth(window.innerWidth - 40);
            } else if (window.innerWidth > 1000 && window.innerWidth < 1300) {
              setWidth(window.innerWidth - 40);
            }
            else{
              setWidth(window.innerWidth - 20);
            }
          }
          if (width === 0){
            calcWidth();
            setHeight(window.innerHeight);
          }
          const updateDimensions = () => {
            calcWidth();
            setHeight(window.innerHeight);  
        }
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    useEffect(async() =>{
      if (!charData && stock){
         let res = await getData(stock,initDur)
         setcharData([...res])
      }
    },[stock])

    const handleControlPanel = async(key,value) =>{
      let tempChng = {}
      tempChng[key] = value
      console.log(tempChng)
      initialSetUp[key]=value
      setinitialSetUp(initialSetUp)
      let prcdata = await getData(stock,tempChng['duration'])
      let adddata = await getAddData(stock,tempChng['duration'])
      setcharData([...prcdata,...adddata])
    }

    const getData = async(stk,dur) =>{
      const cacheKey = stk + "_" + dur + "_PRICE"
      let res = await getStockPriceHist(cacheKey,{stock:stock,duration:dur})
      return res
    }

    const getAddData = async(stk,dur) =>{
      let res = await getRollingSMA(stk,dur)
      return res.map(item => ({close:item.SMA_50,symbol:"SMA_50",date:item.date}))
    }

    return (
        <>
        <title>Price Charts</title>
        <div style={{margin:"20px"}}>
          <div style={{display:actContPanel? "block" : "none"}}><ControlPanel key={initialSetUp} onChanges={handleControlPanel} initialsetup={initialSetUp}></ControlPanel></div>
            <div style={{paddingLeft:"30px",paddingTop:"5px"}} onClick={() => setactContPanel(false)} onMouseLeave={() => actContPanel ? null: setactContPanel(true)}>
              {
                stock && width > 0 ? 
                  <div>
                    <LineChart key={Math.round(width) + stock + charData} chartData={charData}
                              width={Math.round(width)} height={Math.round(height*.90)} margin={margin} 
                              stock={stock} main={true} /></div> : <Image src={myGif} alt="wait" height={30} width={30} />
              }
            </div>
        </div>
        </>
    )
}
export default index