import { useEffect, useState } from 'react'
import LineChart from '../Charts/LineChart'
import { useRouter } from 'next/router'
import myGif from '../../public/loading-loading-forever.gif'
import ControlPanel from './ControlPanel'
import getStockPriceHist from '../../modules/cache/cacheprice'
import {getRollingSMA,} from '../../modules/api/StockIndicators'
import {getPredictionsForStock} from '../../modules/api/StockPrediction'
import Image from 'next/image';
import cloneDeep from 'lodash/cloneDeep';
import moment from 'moment';
import ModalBox from '../../components/ModalBox'
import FloatController from '../../components/FloatController'
import {getStockPortfolioPos} from '../../modules/api/UserPreferences'
import BottomNav from './BottomNav'
import {getColorFromPreDefinedSeq} from '../../modules/utils/UtilFunctions'

const index = (props) =>{
    const router = useRouter()
    const stock = router.query.stock
    const initDur = router.query.dur
    const margin = {top: 20, right: 0, bottom: 30, left: 50}
    const [fullsetdur, setFullSetDur]   = useState(120);
    const [width, setWidth]   = useState(0);
    const [height, setHeight]   = useState(0);
    const [initialSetUp,setinitialSetUp] = useState({duration:router.query.dur})
    const [charData,setcharData] = useState(null)
    const [selections,setSelections] = useState(null)
    const [processing,setProcessing] = useState(false)
    const [showPositions,setShowPositions] = useState(true)
    const [allPortPositions,setAllPortPositions] = useState(null)
    const [realtimeStkPrc,setRealtimeStkPrc] = useState(null)
    const [addLines,setAddLines] = useState([])
    const [fullData,setFullData] = useState(null)

    useEffect(() => {
          const calcWidth = () =>{
            //Can this be moved to css? Not happy at all!
            if (window.innerWidth > 1300){
              setWidth(window.innerWidth*0.96);
            } else if (window.innerWidth > 1000 && window.innerWidth < 1300) {
              setWidth(window.innerWidth*0.96);
            }
            else{
              setWidth(window.innerWidth - 20);
            }
          }
          if (width === 0){
            calcWidth();
            setHeight(window.innerHeight*0.96);
          }
          const updateDimensions = () => {
            calcWidth();
            setHeight(window.innerHeight*0.96);  
        }
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    useEffect (() =>{
      if (showPositions && stock){
        getPositions().then(result => setAllPortPositions([...result]))
      }
    },[showPositions,stock])


    useEffect(() =>{
      if (!charData && stock){
         getData(stock,initDur).then(res => setcharData([...res]))
         getData(stock,fullsetdur).then(res => setFullData([...res]))
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


    const handleChanges = async(key,value,dispName) => {
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
          setDataColorIdentifier(adddata,key,value)
        }
      }else if (key === "PM"){
        setProcessing(true)
        let mdData = await handleModelChanges(value,dispName)
        if (mdData.length >0){
          const unqSymbols = [...new Set(charData.map(item => item.symbol))];
          let tmpAddsToChar = normalizeAllData (unqSymbols,mdData)
          if (tmpAddsToChar.length === 0){
            mdData = [...mdData,...normalizeIncomingData(mdData)]
          }
          setcharData([...charData,...tmpAddsToChar,...mdData])
        }
        setProcessing(false)
      } 
    }

    const setDataColorIdentifier = async (inpData,key,value) => {
      let tempObj = {}
      tempObj.data = inpData
      tempObj.color = getColorFromPreDefinedSeq(addLines.length)
      tempObj.key = key
      tempObj.value = value
      addLines.push(tempObj)
      setAddLines([...addLines])
    }

    const normalizeIncomingData = (inpData) =>{
      let tmpAddsToChar = []
      let lastItem = inpData[inpData.length - 1]
      let filteredData =  charData.filter(item => item.symbol === stock).filter(item2 => 
                          moment(item2.date,'YYYY-MM-DD') > moment(lastItem.date,'YYYY-MM-DD'))

      for (let i=0;i < filteredData.length ; i++){
        let copyoflast = cloneDeep(lastItem)
        copyoflast.date = filteredData[i].date
        tmpAddsToChar.push(copyoflast)
      }                          
      return tmpAddsToChar
    }

    const normalizeAllData = (unqSymbols,mdData) =>{
      let tmpAddsToChar = []
      for (let j=0 ; j < unqSymbols.length ; j++){
        let tmpLastObj = charData.filter(item => item.symbol === unqSymbols[j]).pop()
        let tmpDelta = mdData.filter(object1 => {
          return !charData.filter(item => item.symbol === unqSymbols[j]).some(object2 => {
            return object1.date === object2.date;
          })
        })
        for (let i=0; i< tmpDelta.length;i++){
          if (moment(tmpLastObj.date,'YYYY-MM-DD') < moment(tmpDelta[i].date,'YYYY-MM-DD')){
            let copyoflast = cloneDeep(tmpLastObj);
            if (copyoflast.symbol === stock){
              copyoflast.predictions = 1
            }
            copyoflast.date = tmpDelta[i].date
            tmpAddsToChar.push(copyoflast)
          }
        }  
      }
      return tmpAddsToChar
    }

    const handleModelChanges = async(value,dispName) =>{
      let retval = await getPredictionsForStock(stock,value)
      if (retval.length > 0){
        addToSelections("PRED",value,dispName)
        return retval.map(item => ({close:item["predictedVals"].toFixed(2),symbol:"PRED_" + value,date:item.date}))
      }else{
        return []
      }
    }

    const addToSelections = (key,val,dispName) =>{
      let objKeyVal = {}
      objKeyVal.key = key
      objKeyVal.value = val
      objKeyVal.displayVal = dispName
      setSelections([...selections,objKeyVal])
    }

    const removeSelections = (key,val) =>{
      setSelections([...selections.filter(item => !(item.key === key && item.value === val))])
      adjustDataPostSelections(key,val)
    }

    const adjustDataPostSelections = (key,val) =>{
      let keyToFind = key + "_" + val
      setcharData([...charData.filter(item => item.symbol !== keyToFind)])
    }

    const handleDurChanges = async (key,dur) =>{
      let tempChng = {}
      tempChng[key] = dur
      initialSetUp[key]=dur
      setinitialSetUp(initialSetUp)
      let prcdata = await getData(stock,fullsetdur)
      return prcdata
    }

    const getData = async(stk,dur) =>{
      const cacheKey = stk + "_" + dur + "_PRICE"
      let res = await getStockPriceHist(cacheKey,{stock:stock,duration:dur})
      return res
    }

    const getSMAData = async(stk,indval) =>{
      let res = await getRollingSMA(stk,indval,fullsetdur)
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
        let tempval = addLines.filter(item => !(item.key===type && item.value ===value))
        setAddLines([...tempval])
      }
    }

    const getProcessingContent = () =>{
      return <Image src={myGif} alt="wait" height={30} width={30} />
    }

    const getContentForControlPanel = () =>{
      return (<ControlPanel stock={stock} key={initialSetUp} onChanges={handleChanges} initialsetup={initialSetUp}></ControlPanel>)
    }

    const getPositions = async () =>{
      let res = await getStockPortfolioPos(stock)
      if (res && res.length > 0){
          return res[0].positions
      }
      return []
  }

  const addStreamData = (inpval) =>{
    setRealtimeStkPrc(inpval)
  }

    return (
        <>
        <title>Price Charts</title>
          <FloatController content={getContentForControlPanel()}></FloatController>
            <div style={{paddingLeft:"30px",paddingTop:"20px",height:"90%"}}>
              {
                stock && width > 0 ? 
                  <div>
                    {processing ? <ModalBox content={getProcessingContent()} doNotClose={true}  onClose={() => setProcessing(false)}></ModalBox> : null }
                    <LineChart key={Math.round(width) + stock + charData + initialSetUp?.duration} chartData={charData} fullData={fullData}
                              width={Math.round(width)} height={Math.round(height*.85)} margin={margin} 
                              stock={stock} main={true} positions={allPortPositions} line={undefined} 
                              streamdata={realtimeStkPrc} displayfrom={initialSetUp?.duration} addOns={addLines}/>
                  </div> : <Image src={myGif} alt="wait" height={30} width={30} />
              }
            </div>
            {
              stock ? <BottomNav onChanges={handleChanges} adjSelections={adjustSelections} stock={stock}></BottomNav> : null
            }
        </>
    )
}
export default index