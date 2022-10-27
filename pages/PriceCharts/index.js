import { useEffect, useState } from 'react'
import LineChart from '../Charts/LineChart'
import { useRouter } from 'next/router'
import myGif from '../../public/loading-loading-forever.gif'
import ControlPanel from './ControlPanel'
import getStockPriceHist from '../../modules/cache/cacheprice'
import {getRollingSMA} from '../../modules/api/StockIndicators'
import Image from 'next/image';
import cloneDeep from 'lodash/cloneDeep';
import DisplaySelections from './DisplaySelections'

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
    const [selections,setSelections] = useState(null)

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

    useEffect(() =>{
      const retval = []
      if (initialSetUp.sma){
        for (let i=0;i < initialSetUp.sma.length ;i++){
          let objKeyVal = {}
          objKeyVal.key = "sma"
          objKeyVal.value = initialSetUp.sma[i]
          retval.push(objKeyVal)
        }
      }
      setSelections([...retval])
    },[initialSetUp])

    const handleChanges = async(key,value) => {
      let prcdata = []
      let adddata = []
      if (key === "duration"){
        prcdata = await handleDurChanges("duration",value)
        adddata = await getAddData()
        setcharData([...prcdata,...adddata])
      }else if (key === "sma"){
        let triggerFlow = false
        let objsma = initialSetUp.sma
        if(objsma){
          if (objsma.filter(item => item === parseInt(value)).length === 0){
            objsma.push(parseInt(value))
            triggerFlow = true
          }
        }else{
          objsma = [parseInt(value)]
          triggerFlow = true
        }
        if (triggerFlow){
          let tempSetUp = cloneDeep( initialSetUp )
          tempSetUp.sma = objsma
          setinitialSetUp(tempSetUp)
          adddata = await getSMAData(stock,value)
          setcharData([...charData,...adddata])    
        }
      }
    }

    const handleDurChanges = async (key,dur) =>{
      let tempChng = {}
      tempChng[key] = dur
      initialSetUp[key]=dur
      setinitialSetUp(initialSetUp)
      let prcdata = await getData(stock,dur)
      return prcdata
    }

    const getData = async(stk,dur) =>{
      const cacheKey = stk + "_" + dur + "_PRICE"
      let res = await getStockPriceHist(cacheKey,{stock:stock,duration:dur})
      return res
    }

    const getSMAData = async(stk,indval) =>{
      let res = await getRollingSMA(stk,indval,initialSetUp.duration)
      return res.map(item => ({close:item["SMA_" + indval],symbol:"SMA_" + indval,date:item.date}))
    }

    const getAddData = async() =>{
      const retval = []
      if (initialSetUp.sma){
        for (let i=0;i < initialSetUp.sma.length ;i++){
          retval.push(...await getSMAData(stock,initialSetUp.sma[i]))
        }
      }
      return retval
    }

    const adjustSelections = (type,value) =>{
      let tempSetUp = cloneDeep( initialSetUp )
      if (tempSetUp[type.toLowerCase()].filter(item => item !== value).length === 0){
        delete tempSetUp[type.toLowerCase()]
      }else{
        tempSetUp[type.toLowerCase()] = tempSetUp[type.toLowerCase()].filter(item => item !== value)
      }
      setinitialSetUp(tempSetUp)
      if (type === "sma"){
        setcharData([...charData.filter(item => item.symbol !== "SMA_" + value)])
      }
    }

    return (
        <>
        <title>Price Charts</title>
        <div>
          <div style={{display:actContPanel? "block" : "none"}}><ControlPanel stock={stock} key={initialSetUp} onChanges={handleChanges} initialsetup={initialSetUp}></ControlPanel></div>
            <div style={{paddingLeft:"30px",paddingTop:"5px"}} onClick={() => setactContPanel(false)} onMouseLeave={() => actContPanel ? null: setactContPanel(true)}>
              {
                stock && width > 0 ? 
                  <div>
                    <DisplaySelections key={selections} selections={selections} adjSelections={adjustSelections}></DisplaySelections>
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