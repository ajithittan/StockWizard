import { useState,useEffect } from 'react';
import MovingAvg from './MovingAvg'
import Typography from '@mui/material/Typography';
import {intToString} from '../../modules/utils/UtilFunctions'
import CompanyStockPrice from './CompanyStockPrice'
import {getBasicStockDetails} from '../../modules/api/StockDetails'


const BasicContentStockDetail = (props) =>{

    const [stkBasicDtls, setStkBasicDtls] = useState(null)

    useEffect(() =>{
        if (props.stock){
            //getBasicStockDetails(props.stock).then(retval => {console.log("return from backend?",retval),setStkBasicDtls(retval)})
        }
    },[props.stock])

    return (
        <>
                <Typography>
                {
                    props.stock ? <>
                                <table>
                                    <tr >
                                        <td>SMA</td>
                                        <td>50D($<MovingAvg symbol = {props.stock} type={"SMA_50"}/>)</td>
                                        <td >200D($<MovingAvg symbol = {props.stock} type={"SMA_200"}/>)</td>                                     
                                    </tr>
                                </table>
                                </> : null     
                }
                </Typography>
                {props.stock ? <div style={{paddingLeft:"20px"}}><CompanyStockPrice stock={props.stock} duration={3}></CompanyStockPrice> </div>: null}
        </>
    )
}
export default BasicContentStockDetail
