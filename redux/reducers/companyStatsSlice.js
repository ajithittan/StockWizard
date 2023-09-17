import {createAsyncThunk,createSlice} from '@reduxjs/toolkit';
import {updateUserDashBoardLayout,getUserDashBoardLayout} from '../../modules/api/UserPreferences'

export const updCompanyStats = createAsyncThunk("companystats/updCompStats",async(obj,thunkAPI)=>{
    //thunkAPI.dispatch(SET_DASHLAYOUT(obj))
    //updateUserDashBoardLayout(thunkAPI.getState()?.dashboardlayout?.dashboardlayout)
  })

export const getCompanyStats = createAsyncThunk("companystats/getCompStats",async(obj,thunkAPI)=>{
    let defaultLayout = [
        {type:"revenue",limit:0,period:"A"},
        {type:"income",limit:0,period:"A"},
        {type:"earningspershare",limit:0,period:"A"},
        {type:"cashandcasheqv",limit:0,period:"A"},
        {type:"assets",limit:0,period:"A"},
        {type:"dividends",limit:0,period:"A"},
    ]
    //let res = await getUserDashBoardLayout()
    //res?.length > 0 ? null : res = defaultLayout
    return defaultLayout
}) 

const companyStatsSlice = createSlice({
    name: 'companystats',
    initialState: {
        companystats: null,
        loading:true
    },
    reducers: {
        SET_COMP_STATS: (state=initialState, action) => {
            state.dashboardlayout.map(item => {
                if (item.layoutId === action.payload.layoutId) {
                    let temparr = item.compId
                    temparr.includes(action.payload.compId) ? temparr = temparr.filter(item => item !== action.payload.compId) : temparr.push(action.payload.compId)
                    item.compId = temparr
                    return item;
                }
                return item
              }
            )
        },
        SET_COMP_INITIAL: (state=initialState, action) => {
            state.dashboardlayout = action.payload || [{layoutId:1,compId:[1]},{layoutId:2,compId:[2]},{layoutId:3,compId:[3]}]
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

export const {SET_COMP_STATS,SET_COMP_INITIAL} = companyStatsSlice.actions;
export default companyStatsSlice.reducer;
