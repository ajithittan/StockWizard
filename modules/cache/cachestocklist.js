import memoize from "lodash.memoize";
import {FullStockList} from '../api/StockMaster'

const getFullStockList = async (key,args) => {
  let res = await FullStockList()
  return res
}

export default memoize(getFullStockList);
