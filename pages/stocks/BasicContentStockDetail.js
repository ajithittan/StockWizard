import MovingAvg from './MovingAvg'
import Typography from '@mui/material/Typography';
import {intToString} from '../../modules/utils/UtilFunctions'
import CompanyStockPrice from './CompanyStockPrice'


const BasicContentStockDetail = (props) =>{

    return (
        <>
            <Typography sx={{ mb: 1.5 }} variant="body2">
                {
                    props.stkDetail ? <>
                                <table>
                                    <tr >
                                        <td>Vol</td>
                                        <td>10D({intToString(props.stkDetail.avgdayvol10day)})</td>
                                        <td >3M({intToString(props.stkDetail.avgdayvol3mon)})</td>
                                    </tr>
                                </table>
                                </> : null     
                }
                </Typography>
                <Typography sx={{ mb: 1.5 }} variant="body2">
                {
                    props.stkDetail ? <>
                                <table>
                                    <tr >
                                        <td>SMA</td>
                                        <td>50D($<MovingAvg symbol = {props.stkDetail.symbol} type={"SMA_50"}/>)</td>
                                        <td >200D($<MovingAvg symbol = {props.stkDetail.symbol} type={"SMA_200"}/>)</td>                                     
                                    </tr>
                                </table>
                                </> : null     
                }
                </Typography>
                {props.stkDetail ? <div style={{paddingLeft:"20px"}}><CompanyStockPrice stock={props.stkDetail.symbol} duration={3}></CompanyStockPrice> </div>: null}
        </>
    )
}
export default BasicContentStockDetail
