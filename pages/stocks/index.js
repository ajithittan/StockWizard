import React, { useEffect, useState } from "react";
import StockDetailContainer from './StockDetailContainer'
import {getStockDetailsForStks} from '../../modules/api/StockMaster'

const index = (props) =>{
    const [stkDetails, setStkDetails] = useState(null)

    useEffect(() =>{
      if (props.stocks){
        setStkDetails(props.stocks)
      }
    },[props.stocks])

    const getStkDetails = async (stkList) =>{
      let res = await getStockDetailsForStks(stkList)
      if (res && res.length > 0 ){
        setStkDetails(res)
      }
    }

    return (
      <>
        <StockDetailContainer key={stkDetails} stocks={stkDetails}>
        </StockDetailContainer>
      </>
  )
}

export default index