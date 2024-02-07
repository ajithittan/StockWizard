import CandlestickChartIcon from '@mui/icons-material/CandlestickChart';
import IconButton from '@mui/material/IconButton';
import {addItemsToChart,HIDE_ADDED_ITEMS_IN_CHART} from '../../../redux/reducers/chartDataSlice'
import {useDispatch} from 'react-redux'
import { useState } from 'react';
import {getCachedSupportResistanace} from '../../../modules/cache/cachesupportandresistance'

const CandlePatterns = (props) =>{
    const dispatch = useDispatch()
    const [show,setShow] = useState(false)
    const [inpData,setInpData] = useState(null)
    const [limitSaR,setLimitSaR] = useState(props.limit)

    const showSupportResistance = () => {
        const cacheKey = "supnres_" + props.stock
        getCachedSupportResistanace(cacheKey,{stock:props.stock}).then(retval => {
                if (retval){
                    dispatch(addItemsToChart(normalizeDataForCharts(retval)))
                }
            }
        )
    }

    const normalizeDataForCharts = (inpData) =>{
        const obj = (symbol,type,data,id) => {return {symbol:symbol,id:id,type:type,data:data}}
        let chartdata = []
        for (let i=0; i < Math.min(limitSaR, inpData.data.length); i++){
            chartdata.push(obj(props.stock,inpData.type,inpData.data[i].toFixed(2),Number((inpData.data[i]*100).toFixed(0))))
        }
        setInpData(chartdata)
        return chartdata
    }

    const clickAction = () =>{
        if (show){
            dispatch(HIDE_ADDED_ITEMS_IN_CHART(inpData))
            setShow(false)
        }else{
            showSupportResistance()
            setShow(true)
        }
    }

    return (
        <IconButton aria-label="More Information">
            <CandlestickChartIcon color="primary" onClick={clickAction} />
        </IconButton>     
    )
}

export default CandlePatterns