import memoize from "lodash.memoize";
import {getTopPatternsForStock,getDatesForLastTopPatterns,getPatternsByDate} from '../api/StockPatterns'

const getTopStockPatterns = memoize(async (key,args) => {
  let res = await getTopPatternsForStock(args.limitrows)
  return res
})

const getCachedDatesForLastTopPatterns = memoize(async (key,args) => {
  let res = await getDatesForLastTopPatterns(args.limitDays)
  return res
})

const getCachedPatternsByDate = memoize(async (key,args) => {
  let res = await getPatternsByDate(args.date)
  return res
})


export {getTopStockPatterns,getCachedDatesForLastTopPatterns,getCachedPatternsByDate}
