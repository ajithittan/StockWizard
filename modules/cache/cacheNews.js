import memoize from "lodash.memoize";
import {MultipleStockNews} from '../api/Newsfeed'

const retrieveNewsFromSource = async (key,args) => {
  let res = await MultipleStockNews(args.stock,args.limit)
  return res
}

export default memoize(retrieveNewsFromSource);
