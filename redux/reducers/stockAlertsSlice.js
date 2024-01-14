import {createAsyncThunk,createSlice} from '@reduxjs/toolkit';
import {getStockAlerts,saveStockAlerts,delStockAlerts} from '../../modules/api/UserAlerts'

export const getAlerts = createAsyncThunk("stockAlertsSlice/getAlerts",async(stock,thunkAPI)=>{
    getStockAlerts(stock).then(retval => thunkAPI.dispatch(INITIAL_ALERTS({symbol:stock,alerts:retval})))
}) 

export const addStockPriceAlerts = createAsyncThunk("stockAlertsSlice/addpricealerts",async(obj,thunkAPI)=>{
    saveStockAlerts(obj.chartdata)
}) 

export const deleteStockPriceAlerts = createAsyncThunk("stockAlertsSlice/addpricealerts",async(obj,thunkAPI)=>{
    thunkAPI.dispatch(DELETE_ALERT_BY_ID(obj))
    delStockAlerts(obj.id)
}) 

const stockAlertsSlice = createSlice({
    name: 'stockalerts',
    initialState: {
        stockalerts: null,
        loading:true
    },
    reducers: {
        INITIAL_ALERTS: (state=initialState, action) => {
            if (state.stockalerts){
                const indx = state?.stockalerts?.findIndex(item => item.symbol === action.payload.symbol)
                if (indx > -1){
                    state.stockalerts[indx] = action.payload
                }else{
                    state.stockalerts.push(action.payload)
                }
            }else{
                state.stockalerts = [action.payload]
            }
        },
        DELETE_ALERT_BY_ID: (state=initialState, action) => {
            if (state.stockalerts){
                const indx = state?.stockalerts?.findIndex(item => item.symbol === action.payload.symbol)
                if (indx > -1){
                    const alertsleft = state.stockalerts[indx].alerts.filter(item => item.id !== action.payload.id) 
                    if (alertsleft.length >0){
                        state.stockalerts[indx].alerts = alertsleft
                    }else{
                        state.stockalerts.splice(indx,1)    
                    }
                }
            }
        }
    }
}) 

export const {INITIAL_ALERTS,DELETE_ALERT_BY_ID} = stockAlertsSlice.actions;
export default stockAlertsSlice.reducer;