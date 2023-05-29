import memoize from "lodash.memoize";
import {getSimpleMovingAverages} from '../api/StockIndicators'

const getCachedSimpleMovAvgs = async (key,args) => {
  let res = await getSimpleMovingAverages(args.stock,args.last)
  return res
}

export default memoize(getCachedSimpleMovAvgs);
