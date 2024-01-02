import {createAsyncThunk,createSlice} from '@reduxjs/toolkit';
import {getUserStocks,updStockPortfolioPos,delStockFromPortfolioPos} from '../../modules/api/UserPreferences'

export const getChartDataFromSource = createAsyncThunk("chartdataslice/getchartdata",async(obj,thunkAPI)=>{
    let res = await getUserStocks()
    return res
}) 

const streamingQuotesSlice = createSlice({
    name: 'streamingquotes',
    initialState: {
        streamdata: null,
        loading:true
    },
    reducers: {
        ADD_TO_QUOTES: (state=initialState, action) => {
                state.streamdata = action.payload
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getChartDataFromSource.pending,(state)=>{
            state.loading=true
        })
        .addCase(getChartDataFromSource.fulfilled,(state,action)=>{
            state.loading=false
            state.streamdata=action.payload
        })
        .addCase(getChartDataFromSource.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message
        })
    }        
}) 

export const {ADD_TO_QUOTES} = streamingQuotesSlice.actions;
export default streamingQuotesSlice.reducer;
