import memoize from "lodash.memoize";
import {getTopPatternsForStock,getDatesForLastTopPatterns,getPatternsByDate,getMostRecentPatterns,getRecentPatternsForAStock
  ,getPatternPerformanceFromDate} from '../api/StockPatterns'

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

const getCachedPatternsMostRecent = memoize(async (key,args) => {
  let res = await getMostRecentPatterns()
  return res
})

const getCachedRecentPatternsForStock = memoize(async (key,args) => {
  let res = await getRecentPatternsForAStock(args.stock,args.limitdays)
  return res
})

const getCachedPerformanceStkDate = memoize(async (key,args) => {
  let res = await getPatternPerformanceFromDate(args.stock,args.datefrom)
  return res
})

export {getTopStockPatterns,getCachedDatesForLastTopPatterns,getCachedPatternsByDate,getCachedPatternsMostRecent,
  getCachedRecentPatternsForStock,getCachedPerformanceStkDate}
