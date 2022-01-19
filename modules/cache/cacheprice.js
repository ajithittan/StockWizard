import memoize from "lodash.memoize";
import {StockPrice} from '../api/StockMaster'

const getStockPriceHist = async (key,args) => {
  let res = await StockPrice(args.stock,args.duration)
  return res
}

export default memoize(getStockPriceHist);
