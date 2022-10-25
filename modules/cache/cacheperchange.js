import memoize from "lodash.memoize";
import {StockPerChange} from '../api/StockMaster'

const getStockPerChange = async (key,args) => {
  let res = await StockPerChange(args.stock,args.duration,args.rollup,args.unit,args.byType)
  return res
}

export default memoize(getStockPerChange);
