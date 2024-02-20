import memoize from "lodash.memoize";
import {getTopPatternsForStock} from '../api/StockPatterns'

const getTopStockPatterns = async (key,args) => {
  let res = await getTopPatternsForStock(args.limitrows)
  return res
}

export default memoize(getTopStockPatterns);
