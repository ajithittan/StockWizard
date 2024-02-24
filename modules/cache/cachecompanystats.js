import memoize from "lodash.memoize";
import {getCompanyKeyStats} from '../../modules/api/StockDetails'
import {getCompanyProfile} from '../../modules/api/StockDetails'

const getCacheCompanyKeyStats = memoize(async (key,args) => {
  let res = await getCompanyKeyStats(args.type,args.stock,args.limit,args.period)
  return res
})

const getCacheCompanyKeyStatsv2 = memoize(async (key,args) => {
  let res = await getCompanyProfile(args.stock)
  return res
})

export {getCacheCompanyKeyStats,getCacheCompanyKeyStatsv2}
