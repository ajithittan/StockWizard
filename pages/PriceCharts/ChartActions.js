import SupportAndResistance from '../stocks/actions/SupportAndResistance'
import PriceAlerts from '../stocks/actions/PriceAlerts'
import CandlePatterns from './Patterns/CandlePatterns'
import AllPatterns from './Patterns/AllPatterns'

const ChartActions = (props) =>{

    return(
        <>
            <SupportAndResistance stock={props.stock} limit={10}></SupportAndResistance>
            <CandlePatterns stock={props.stock} ></CandlePatterns>
            <PriceAlerts stock={props.stock} ></PriceAlerts>
            <AllPatterns stock={props.stock} ></AllPatterns>
        </>
    )

}

export default ChartActions