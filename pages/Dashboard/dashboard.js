import {useAppSkinContext} from '../../modules/state/GlobalSkinState'
import Newsfeeds from '../Newsfeeds'
import { useEffect,useState } from "react"
import Stocks from '../stocks'

const DashBoard = (props) => {
    const [skinVal,changeSkinVal] = useAppSkinContext()
    const [dataSetUp,setdataSetUp] = useState(null)

    useEffect(() =>{
        if (!dataSetUp){
            if (localStorage.getItem("dashboard")){
                setdataSetUp(JSON.parse(localStorage.getItem("dashboard")))
            }
        }
    })

    return(
        <div className="wrapper">
            <div className="div1">
                <Stocks />
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
    )
   }
  export default DashBoard