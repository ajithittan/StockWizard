import { useEffect, useState } from "react"
import getTopStockPatterns from '../../modules/cache/cachetopstockpatterns'
import SectorAnalysisByTab from './SectorAnalysisByTab'

const LatestPatterns = (props) =>{
    let [patternsByDate,setPatternsByDate] = useState([])
    const [limitOfRows,setLimitOfRows] = useState(200)

    useEffect(() =>{
        const cacheKey = "STK_ALL_PTRNS_" + limitOfRows || 200
        getTopStockPatterns(cacheKey,{limitrows:limitOfRows ||200}).then(retval => {
            if (retval.length > 0){
                    retval.sort((a, b) => a.symbol.localeCompare(b.symbol))
                    let uniquedates = [...new Set(retval.map(eachitem => eachitem.date))]
                    uniquedates.forEach(date => {
                        let itemsByDate = retval.filter(eachitem => eachitem.date === date)
                        let tempset = {}
                        tempset.date = date
                        tempset.patterns = itemsByDate
                        patternsByDate.push(tempset)
                    })
                    setPatternsByDate([...patternsByDate])
                }
            }
        )
    },[])

    return (
        <div style={{width:"90%",marginLeft:"2%",marginTop:"2%" }}>
            <SectorAnalysisByTab patterns={patternsByDate}> moreinfo={true}</SectorAnalysisByTab>
        </div>
    )
}

export default LatestPatterns