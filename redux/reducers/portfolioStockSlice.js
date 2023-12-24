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

const portfolioStockSlice = createSlice({
    name: 'porfoliostock',
    initialState: {
        stockList: null,
        loading:true,
        stockquotes:null
    },
    reducers: {
        ADD_STOCKS_TO_PORTFOLIO: (state=initialState, action) => {
            if (state.stockList){
                let delta = action.payload.filter(item => !state.stockList.includes(item))
                delta.length > 0 ? state.stockList.push(...delta) : null
            }else{
                state.stockList = action.payload
            }
        },
        UPD_STOCK_QUOTES: (state=initialState, action) => {
            state.stockquotes = action.payload
        },
        REMOVE_STOCK_FROM_PORFOLIO: (state=initialState, action) => {
            let newList = state.stockList.filter(item => item !==action.payload)
            state.stockList = newList
        }},
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

export const {ADD_STOCKS_TO_PORTFOLIO,UPD_STOCK_QUOTES,REMOVE_STOCK_FROM_PORFOLIO} = portfolioStockSlice.actions;
export default portfolioStockSlice.reducer;
