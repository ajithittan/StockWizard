import {createAsyncThunk,createSlice} from '@reduxjs/toolkit';
import {getUserCompanyStats,updateUserCompanyStats} from '../../modules/api/UserPreferences'

export const updCompanyStats = createAsyncThunk("companystats/updCompStats",async(obj,thunkAPI)=>{
    thunkAPI.dispatch(ADD_STATS_TO_LIST(obj))
    updateUserCompanyStats(thunkAPI.getState()?.companystats?.companystats)
  })

export const delCompanyStats = createAsyncThunk("companystats/updCompStats",async(obj,thunkAPI)=>{
    thunkAPI.dispatch(DEL_STATS_FROM_LIST(obj))
    updateUserCompanyStats(thunkAPI.getState()?.companystats?.companystats)
  })  

export const getCompanyStats = createAsyncThunk("companystats/getCompStats",async(obj,thunkAPI)=>{
    let defaultLayout = [
        {type:"revenue",limit:0,period:"A"},
        {type:"grossprofit",limit:0,period:"A"},
        {type:"income",limit:0,period:"A"},
        {type:"earningspershare",limit:0,period:"A"}
    ]
    let res = await getUserCompanyStats()
    if (!res || res?.length === 0){
        updateUserCompanyStats(defaultLayout)
    }
    res?.length > 0 ? null : res = defaultLayout
    return res
}) 

const companyStatsSlice = createSlice({
    name: 'companystats',
    initialState: {
        companystats: null,
        loading:true
    },
    reducers: {
        ADD_STATS_TO_LIST: (state=initialState, action) => {
            state.companystats.push(action.payload)
        },
        DEL_STATS_FROM_LIST:(state=initialState, action) => {
            let filteredArr = state.companystats.filter(item => item.type !== action.payload)
            state.companystats = filteredArr
        }},
    extraReducers:(builder)=>{
        builder
        .addCase(getCompanyStats.pending,(state)=>{
            state.loading=true
        })
        .addCase(getCompanyStats.fulfilled,(state,action)=>{
            state.loading=false
            state.companystats=action.payload
        })
        .addCase(getCompanyStats.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message
        })
    }        
}) 

export const {ADD_STATS_TO_LIST,DEL_STATS_FROM_LIST} = companyStatsSlice.actions;
export default companyStatsSlice.reducer;
