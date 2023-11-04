import memoize from "lodash.memoize";
import {getCompanyKeyStats} from '../../modules/api/StockDetails'

const getCacheCompanyKeyStats = async (key,args) => {
  let res = await getCompanyKeyStats(args.type,args.stock,args.limit,args.period)
  return res
}

export default memoize(getCacheCompanyKeyStats);
