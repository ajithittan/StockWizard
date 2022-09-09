import {useAppSkinContext} from '../../modules/state/GlobalSkinState'
import Newsfeeds from '../Newsfeeds'
import { useEffect,useState } from "react"
import Stocks from '../stocks'
import Charting from '../../components/Charting'
import {useAppContext} from '../../modules/state/stockstate'
import MainGrid from '../Containers'

const DashBoard = (props) => {
    const [skinVal,changeSkinVal] = useAppSkinContext()
    const [dataSetUp,setdataSetUp] = useState(null)
    const stockList = useAppContext()[0]
    const [chartItems,setchartItems] = useState(null)

    useEffect(() =>{
        if (!dataSetUp){
            if (localStorage.getItem("dashboard")){
                setdataSetUp(JSON.parse(localStorage.getItem("dashboard")))
            }
        }
    },[])

    const getChartItems = () => {
        if(stockList){
            return([<Charting stocks={stockList} size={6.05} indx={1} duration={12} name="" />])
        }
    }

    return(
        <>
        <div className="wrapper">
            <div className="div1">
                <Stocks />
                <div>
                    <MainGrid key={chartItems} items = {getChartItems()} size={6}/>
                </div>
            </div>
            <div className="div2">
                <div className="inner1" >
                    <div className="Row">
                        <div className={"Column DivHeader_" + skinVal.header} >Technology News</div>
                    </div>
                    <Newsfeeds feedtype={3}/>
                </div>
            </div>
            <div className="div3">
                <div className="inner1">
                    <div className="Row">
                        <div className={"Column DivHeader_" + skinVal.header} >Stock News</div>
                    </div>
                    <Newsfeeds feedtype={2}/>
                </div>     
            </div>
        </div>
        </>
    )
   }
  export default DashBoard
