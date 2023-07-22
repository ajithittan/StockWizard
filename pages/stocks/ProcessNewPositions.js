import { useEffect, useState } from "react"
import StockSymbolSelector from '../../components/StockSymbolSelector'

const ProcessNewPositions = (props) =>{

    const AddtoList = (stockSym) =>{
        console.log("ProcessNewPositions",stockSym)
        props.addStks(stockSym)
    }

    return(
        <>
            <span className="textOnPositions">Add stocks that are in your portfolio or hold a position or 
                you just wanna keep an eye on. We'll keep tracking it for you.</span>
            <hr></hr>    
            <StockSymbolSelector updates={AddtoList} initialset={props.initialSetOfStocks} 
                    onlyNewOnes={true} nodelete={true}></StockSymbolSelector>
            <br></br><br></br>
            <span className="textOnPositions">Give it a few mins and we'll get it all synced up.</span>
        </>
    )
}

export default ProcessNewPositions