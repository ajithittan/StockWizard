import memoize from "lodash.memoize";
import {getSupportResistanace} from '../api/StockIndicators'

const getCachedSupportResistanace = memoize(async (key,args) => {
  let res = await getSupportResistanace(args.stock)
  return res
})


export {getCachedSupportResistanace}
