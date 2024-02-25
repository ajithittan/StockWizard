import {createAsyncThunk,createSlice} from '@reduxjs/toolkit';
import {getCachedPatternsMostRecent} from '../../modules/cache/cachetopstockpatterns'

export const getMostRecentPatternsFormed = createAsyncThunk("stockAlertsSlice/getAlerts",async(inpVal,thunkAPI)=>{
    getCachedPatternsMostRecent().then(retval => thunkAPI.dispatch(INITIAL_PATTERNS(retval)))
}) 

const stockPatternsSlice = createSlice({
    name: 'stockpatterns',
    initialState: {
        stockpatterns: null,
        loading:true
    },
    reducers: {
        INITIAL_PATTERNS: (state=initialState, action) => {
            if (action.payload){
                state.stockpatterns = action.payload
            }
        }
    }
}) 

export const {INITIAL_PATTERNS} = stockPatternsSlice.actions;
export default stockPatternsSlice.reducer;