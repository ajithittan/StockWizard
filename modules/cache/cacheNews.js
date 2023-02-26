import memoize from "lodash.memoize";
import {StockNewsFeeds} from '../api/Newsfeed'

const retrieveNewsFromSource = async (key,args) => {
  let res = await StockNewsFeeds(args.stock)
  return res
}

export default memoize(retrieveNewsFromSource);
