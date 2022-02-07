import memoize from "lodash.memoize";
import {StockSector} from '../api/StockMaster'

const getStockSector = async (key,args) => {
  let res = await StockSector()
  return res
}

export default memoize(getStockSector);
