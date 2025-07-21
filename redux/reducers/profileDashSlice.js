import {createAsyncThunk,createSlice} from '@reduxjs/toolkit';
import {updateUserDashBoardLayout,getUserDashBoardLayout} from '../../modules/api/UserPreferences'
import {saveWatchList,getWatchList,removefromwatchlist} from '../../modules/api/UserWatchList'

export const updDashboardLayout = createAsyncThunk("dashboardlayout/updDashLay",async(obj,thunkAPI)=>{
    thunkAPI.dispatch(SET_DASHLAYOUT(obj))
    updateUserDashBoardLayout(thunkAPI.getState()?.dashboardlayout?.dashboardlayout)
  })

//this needs to be fixed....fucked up the data structures....
export const updDashboardSlider = createAsyncThunk("dashboardlayout/updDashSlider",async(obj,thunkAPI)=>{
    thunkAPI.dispatch(SET_DASH_SLIDER_DUR(obj))
    updateUserDashBoardLayout(thunkAPI.getState()?.dashboardlayout?.dashboardlayout)
})  

export const getDashboardLayout = createAsyncThunk("dashboardlayout/getDashLay",async(obj,thunkAPI)=>{
    let defaultLayout = [{layoutId:1,compId:[1]},{layoutId:2,compId:[2]},{layoutId:3,compId:[3]}]
    let res = await getUserDashBoardLayout()
    res?.length > 0 ? null : res = defaultLayout
    return res
}) 

export const updUserWatchList = createAsyncThunk("dashboardlayout/updWatchList",async(obj,thunkAPI)=>{
    saveWatchList(obj)
    thunkAPI.dispatch(UPD_WATCH_LIST(obj))
  })

export const remStockFromWatchList = createAsyncThunk("dashboardlayout/remWatchList",async(obj,thunkAPI)=>{
    thunkAPI.dispatch(DEL_WATCH_LIST(obj))
    removefromwatchlist(obj)
})  

export const getUserWatchList = createAsyncThunk("dashboardlayout/getWatchList",async(obj,thunkAPI)=>{
    let watchList = await getWatchList()
    if (watchList && watchList.length >0){
        thunkAPI.dispatch(SET_WATCH_LIST(watchList))
    }
  })  

const profileDashSlice = createSlice({
    name: 'dashboardlayout',
    initialState: {
        dashboardlayout: null,
        dashboardstocks: null,
        dashboardsector: false,
        dashboardselsector: 0,
        dashboardoptions:{addstks:true,subheader:"basic",showcarddetail:true,showcardactions:true},
        dashboardsliderdur:{type:"M",val:3},
        watchlist:null,
        watchlistincontext:null,
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
        },
        SET_DASH_SLIDER_DUR: (state=initialState, action) => {
            state.dashboardsliderdur = action.payload
        },
        SET_WATCH_LIST: (state=initialState, action) => {
            state.watchlist = action.payload
        },
        SET_WATCH_LIST_CONTEXT: (state=initialState, action) => {
            state.watchlistincontext = action.payload
        },
        UPD_WATCH_LIST: (state=initialState, action) => {
            if(action.payload && action.payload.length > 0){
                if (state.watchlist){
                    state.watchlist = Array.from(new Set([...state.watchlist,...action.payload]))
                }else{
                    state.watchlist = action.payload
                }    
            }
        },
        ADD_TO_DASH_STOCKS: (state=initialState, action) => {
            if (state.dashboardstocks){
                state.dashboardstocks = [...new Set([...state.dashboardstocks,...action.payload])]
            }else{
                state.dashboardstocks = [...new Set([...action.payload])]
            }
        },   
        REM_FRM_DASH_STOCKS: (state=initialState, action) => {
            if(action.payload){
                state.dashboardstocks = state.dashboardstocks.filter(item => item !== action.payload)
            }
        },         
        UPD_DASH_OPTIONS : (state=initialState, action) => {
            const keys = Object.keys(action.payload);
            keys.map(item => state.dashboardoptions[item] = action.payload[item])
        },
        DEL_WATCH_LIST: (state=initialState, action) => {
            if(action.payload){
                if (state.watchlist){
                    state.watchlist = state.watchlist.filter(item => item !== action.payload)
                }    
            }
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

export const {SET_DASHLAYOUT,SET_INITIAL,SET_DASH_STOCKS,SET_SECTOR,
              SET_DASH_SECTOR,SET_DASH_SLIDER_DUR,SET_WATCH_LIST,UPD_WATCH_LIST,
              SET_WATCH_LIST_CONTEXT,DEL_WATCH_LIST,UPD_DASH_OPTIONS,ADD_TO_DASH_STOCKS,REM_FRM_DASH_STOCKS} = profileDashSlice.actions;
export default profileDashSlice.reducer;
