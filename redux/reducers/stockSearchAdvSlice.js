import {createAsyncThunk,createSlice} from '@reduxjs/toolkit';
import {getUserStocks,updStockPortfolioPos,delStockFromPortfolioPos} from '../../modules/api/UserPreferences'

export const getPortfolioStocks = createAsyncThunk("porfoliostock/getstocks",async(obj,thunkAPI)=>{
    let res = await getUserStocks()
    return res
}) 

export const updPortfolioStocks = createAsyncThunk("porfoliostock/upd",async(obj,thunkAPI)=>{
    thunkAPI.dispatch(ADD_STOCKS_TO_PORTFOLIO(obj))
    updStockPortfolioPos(thunkAPI.getState()?.porfoliostock?.stockList)
}) 

export const removePortfolioStock = createAsyncThunk("porfoliostock/upd",async(obj,thunkAPI)=>{
    thunkAPI.dispatch(REMOVE_STOCK_FROM_PORFOLIO(obj))
    delStockFromPortfolioPos(obj)
}) 

const stockSearchAdv = createSlice({
    name: 'stocksearchddv',
    initialState: {
        searchquery: [],
        searchautofill:[
            {label: 'Large Caps' , query:{type:"mcap",param:0,op:">",val:10000000000}},
            {label: 'Mid Caps' , query:{type:"mcap",param:0,op:"bet",val:[2000000000 , 10000000000]}},
            {label: 'Small Caps' , query:{type:"mcap",param:0,op:"<",val:2000000000}},
            {label: 'Bullish Patterns' , query:{type:"pattern_***_",param:0,op:"not_like",val:'null'}},
            {label: 'close < 50D Moving Avg', query:{type:"close",param:0,op:"<",val:"SMA_50"}},
            {label: '200 day SMA > 50 day SMA' , query:{type:"SMA",param:200,op:">",val:"SMA_50"}},
            {label: '200 day SMA > close' , query:{type:"SMA",param:200,op:">",val:"close"}},
            {label: '14 Day RSI < 30' , query:{type:"rsi",param:14,op:"<",val:30}},
            {label: '14 Day RSI > 80' , query:{type:"rsi",param:14,op:">",val:80}}],
        loading:true
    },
    reducers: {
        ADD_QUERY_TO_SEARCH: (state=initialState, action) => {
            state.searchquery = [...state.searchquery,action.payload]
        },
        REMOVE_QUERY_FROM_SEARCH : (state=initialState, action) => 
        {
            state.searchquery = state.searchquery.filter(item => item.label !== action.payload["label"])
        },
        ADD_TO_AUTO_FILL: (state=initialState, action) => {
            state.searchautofill = [...state.searchautofill,action.payload]
        },
        },
    extraReducers:(builder)=>{
        builder
        .addCase(getPortfolioStocks.pending,(state)=>{
            state.loading=true
        })
        .addCase(getPortfolioStocks.fulfilled,(state,action)=>{
            state.loading=false
            state.stockList=action.payload
        })
        .addCase(getPortfolioStocks.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message
        })
    }        
}) 

export const {ADD_QUERY_TO_SEARCH,REMOVE_QUERY_FROM_SEARCH,ADD_TO_AUTO_FILL} = stockSearchAdv.actions;
export default stockSearchAdv.reducer;
