import {createAsyncThunk,createSlice} from '@reduxjs/toolkit';
import {updateUserDashBoardLayout,getUserDashBoardLayout} from '../../modules/api/UserPreferences'

export const updDashboardLayout = createAsyncThunk("dashboardlayout/updDashLay",async(obj,thunkAPI)=>{
    thunkAPI.dispatch(SET_DASHLAYOUT(obj))
    updateUserDashBoardLayout(thunkAPI.getState()?.dashboardlayout?.dashboardlayout)
  })

export const getDashboardLayout = createAsyncThunk("dashboardlayout/getDashLay",async(obj,thunkAPI)=>{
    let defaultLayout = [{layoutId:1,compId:[1]},{layoutId:2,compId:[2]},{layoutId:3,compId:[3]}]
    let res = await getUserDashBoardLayout()
    res?.length > 0 ? null : res = defaultLayout
    return res
}) 

const profileDashSlice = createSlice({
    name: 'dashboardlayout',
    initialState: {
        dashboardlayout: null,
        dashboardstocks: null,
        dashboardsector: false,
        dashboardselsector: 0,
        loading:true
    },
    reducers: {
        SET_DASHLAYOUT: (state=initialState, action) => {
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
        SET_INITIAL: (state=initialState, action) => {
            state.dashboardlayout = action.payload || [{layoutId:1,compId:[1]},{layoutId:2,compId:[2]},{layoutId:3,compId:[3]}]
        },
        SET_SECTOR : (state=initialState, action) => {
            state.dashboardsector = action.payload
        },
        SET_DASH_SECTOR :(state=initialState, action) => {
            state.dashboardselsector = action.payload
        },
        SET_DASH_STOCKS: (state=initialState, action) => {
            state.dashboardstocks = action.payload?.slice(0,30)
        }},
    extraReducers:(builder)=>{
        builder
        .addCase(getDashboardLayout.pending,(state)=>{
            state.loading=true
        })
        .addCase(getDashboardLayout.fulfilled,(state,action)=>{
            state.loading=false
            state.dashboardlayout=action.payload
        })
        .addCase(getDashboardLayout.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message
        })
    }        
}) 

export const {SET_DASHLAYOUT,SET_INITIAL,SET_DASH_STOCKS,SET_SECTOR,SET_DASH_SECTOR} = profileDashSlice.actions;
export default profileDashSlice.reducer;
