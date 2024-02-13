import memoize from "lodash.memoize";
import {getPatternsForStock} from '../api/StockPatterns'

const getStockPatterns = async (key,args) => {
  let res = await getPatternsForStock(args.stock)
  return res
}

export default memoize(getStockPatterns);
