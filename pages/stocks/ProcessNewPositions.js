import StockSymbolSelector from '../../components/StockSymbolSelector'

const ProcessNewPositions = (props) =>{
    
    const AddtoList = (stockSym) =>{
        props.updates([...stockSym])
    }

    return(
        <>
            <span className="textOnPositions">Add stocks that are in your portfolio. We'll keep tracking it for you.</span>
            <hr></hr>    
            <StockSymbolSelector updates={AddtoList} initialset={props.initialSetOfStocks} 
                    onlyNewOnes={true} nodelete={true}></StockSymbolSelector>
            <br></br><br></br>
            <span className="textOnPositions">Give it a few mins and we'll get it all synced up.</span>
        </>
    )
}

export default ProcessNewPositions