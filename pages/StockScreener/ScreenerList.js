import { useState,useEffect,forwardRef,cloneElement } from "react"
import {useSelector} from 'react-redux'
import IntraDayPatternScreener from './IntraDayPatternScreener'
import StockChart from './StockChart'

const ScreenerList = forwardRef((props,inpref) => {
    const [scrList, setScrList] = useState(null)
    const {clkctxdata} = useSelector(state => state.stockscreener)
    const staticList = [
        {label:'INTRA_DAY',comp:<IntraDayPatternScreener/>, default:true},
        {label:'STOCK_GRAPH',comp:<StockChart/>}
    ]
    useEffect(() =>{
        if (clkctxdata){

            let cloneAndAddParams = (inpObj,newProps) => {
                return cloneElement(
                    inpObj, // The original component instance
                    newProps // The object containing new props
                )
            }

            let arrOfComps = []
            arrOfComps.push(staticList.filter(item => item.label === clkctxdata[0].type)[0].comp)
            props.onselect(
                [
                    cloneAndAddParams(staticList.filter(item => item.label === clkctxdata[0].type)[0].comp,{...clkctxdata[0]?.data,mini:false,ref:props.refmain}),
                    ...clkctxdata.slice(1).map(item => cloneAndAddParams(staticList.filter(stlist => stlist.label === item.type)[0].comp,{...item.data,mini:true,ref:props.refSmallCont}))
                ])
        }else{
            props.onselect([staticList.filter(item => item.default)[0].comp])
        }
    },[clkctxdata])

    return (
        <></>
    )
})

export default ScreenerList