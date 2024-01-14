import {createAsyncThunk,createSlice} from '@reduxjs/toolkit';
import {getStockAlerts} from '../../modules/api/UserAlerts'

export const getAlerts = createAsyncThunk("notificationsSlice/getAlerts",async(stock,thunkAPI)=>{
    getStockAlerts(stock).then(retval => thunkAPI.dispatch(INITIAL_ALERTS({symbol:stock,alerts:retval})))
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
        }
    }
}) 

export const {INITIAL_ALERTS} = stockAlertsSlice.actions;
export default stockAlertsSlice.reducer;