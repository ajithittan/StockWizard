import React, { useState, useEffect } from 'react'
import {useAppContext} from '../state/stockstate'

const Stocks = () => {
    const stockList = useAppContext()

    return (
        <div>
            {console.log("stock list",stockList)}
            {stockList ? 
                stockList.map((stock) => (
                    <p>This is - {stock.stock}</p> 
                )):null
            }
        </div>
    )
};

export default Stocks;