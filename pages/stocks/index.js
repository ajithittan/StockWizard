import React, { useEffect, useState } from "react";
import StockDetailContainer from './StockDetailContainer'
import {getStockDetailsForStks} from '../../modules/api/StockMaster'
import {removePortfolioStock} from '../../redux/reducers/portfolioStockSlice'
import { useSelector, useDispatch} from 'react-redux'

const index = (props) =>{
    const dispatch = useDispatch()
    const [stocks, setStocks] = useState(null)

    useEffect(() =>{
      if (props.stocks){
        setStocks(props.stocks)
      }
    },[props.stocks])

    //const removeStock = (stock) => props.actionChangeList([...stocks.filter(item => item !== stock)])

    const removeStock = (stock) => dispatch(removePortfolioStock([stock]))

    const addStock = (newStocks) => props.actionChangeList(stocks? [...newStocks,...stocks] : [...newStocks])

    return (
      <>
        <StockDetailContainer key={stocks} stocks={stocks} actionRemove={removeStock} actionAdd={addStock}/>
      </>
  )
}

export default index