import {createAsyncThunk,createSlice} from '@reduxjs/toolkit';
import {getUserStocks,updStockPortfolioPos,delStockFromPortfolioPos} from '../../modules/api/UserPreferences'
import {saveStockAlerts} from '../../modules/api/UserAlerts'

export const getChartDataFromSource = createAsyncThunk("chartdataslice/getchartdata",async(obj,thunkAPI)=>{
    let res = await getUserStocks()
    return res
}) 

export const addStockPriceAlerts = createAsyncThunk("chartdataslice/addchartdata",async(obj,thunkAPI)=>{
    thunkAPI.dispatch(ADD_ELEMENTS_TO_CHART(obj))
    saveStockAlerts(obj.chartdata,obj.symbol)
}) 

const chartDataSlice = createSlice({
    name: 'chartdata',
    initialState: {
        chartdata: null,
        newchartelements:null,
        loading:true
    },
    reducers: {
        ADD_TO_CHART_DATA: (state=initialState, action) => {
            if (state.chartdata){
                const indx = state.chartdata.findIndex(item => item.symbol === action.payload.symbol)
                if (indx > -1){
                    state.chartdata[indx] = action.payload
                }else{
                    state.chartdata.push(action.payload)
                }
            }else{
                state.chartdata = [action.payload]
            }
        },
        ADD_ELEMENTS_TO_CHART:(state=initialState, action) => {
            if(action.payload){
                if (state.newchartelements){
                    //const indx = state.chartdata.findIndex(item => item.symbol === action.payload.symbol)
                    state.newchartelements.push(action.payload)
                }else{
                    state.newchartelements = [action.payload]
                }
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
            state.chartdata=action.payload
        })
        .addCase(getChartDataFromSource.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message
        })
    }        
}) 

export const {ADD_TO_CHART_DATA,ADD_ELEMENTS_TO_CHART} = chartDataSlice.actions;
export default chartDataSlice.reducer;
