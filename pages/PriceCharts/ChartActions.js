import SupportAndResistance from '../stocks/actions/SupportAndResistance'
import PriceAlerts from '../stocks/actions/PriceAlerts'

const ChartActions = (props) =>{

    return(
        <>
        <SupportAndResistance stock={props.stock} limit={10}></SupportAndResistance>
        <PriceAlerts stock={props.stock} ></PriceAlerts>
        </>
    )

}

export default ChartActions