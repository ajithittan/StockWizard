import { useEffect, useState } from "react"

const StockList = () =>{

    const [stkList,setstkList] = useState(null)

    useEffect(() => {
        setTimeout(() => setstkList([{stock:'AAPL'},{stock:'MSFT'}]),5000)
    },[])

    return (
        stkList
    )
}

export default StockList