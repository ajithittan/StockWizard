import { useEffect, useState } from "react"
import {getCachedDatesForLastTopPatterns} from '../../modules/cache/cachetopstockpatterns'
import SectorAnalysisByTab from './SectorAnalysisByTab'

const LatestPatterns = (props) =>{
    const [datesForPatterns,setDatesForPatterns] = useState([])
    const [limitDays,setLimitDays] = useState(10)

    useEffect(() =>{
        const cacheKey = "PTRN_DTS_" + limitDays || 10
        getCachedDatesForLastTopPatterns(cacheKey,{limitDays:limitDays || 10}).then(retval => {
            if (retval.length > 0){
                    console.log("retvalretvalretval",retval)
                    setDatesForPatterns(retval)
                }
            }
        )
    },[])

    return (
        <>
            <SectorAnalysisByTab patterndates={datesForPatterns}></SectorAnalysisByTab>
        </>
    )
}

export default LatestPatterns