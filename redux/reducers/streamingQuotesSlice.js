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
        },
        ADD_TO_STREAMED_QUOTES: (state=initialState, action) => {
            if(action.payload){
                action.payload.forEach(element => {
                    const indx = state.streamdata.findIndex(item => item.symbol === element.symbol)
                    if (indx > -1){
                        state.streamdata[indx] = element
                    }else{
                        state.streamdata.push(element)
                    }
                });
            }
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

export const {ADD_TO_QUOTES,ADD_TO_STREAMED_QUOTES} = streamingQuotesSlice.actions;
export default streamingQuotesSlice.reducer;
