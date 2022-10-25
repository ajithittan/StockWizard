import memoize from "lodash.memoize";
import {SectorStockPerChange} from '../api/StockMaster'

const getSectorStockPerChange = async (key,args) => {
  let res = await SectorStockPerChange(args.stock,args.duration,args.rollup,args.unit,args.byType)
  return res
}

export default memoize(getSectorStockPerChange);
