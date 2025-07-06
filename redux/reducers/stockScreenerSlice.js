import {createSlice} from '@reduxjs/toolkit';

const stockScreenerSlice = createSlice({
    name: 'stockscreener',
    initialState: {
        stockscreener: null,
        rowcount:50,
        loading:true,
        clkctxdata:[{id:"INTRA_DAY",type:"INTRA_DAY"}],
        dispsettings:{showMainContainer:true,showBottomContainer:true,maincontht:75,mainconthttp:"vh",restcontht:"au",restconthttp:"to"},
        streamstocks:null
    },
    reducers: {
        UPD_ROW_COUNTS: (state=initialState, action) => {
            if (action.payload){
                state.rowcount = action.payload
            }
        },
        CLICKED_ROW_DATA: (state=initialState, action) => {
            if (action.payload){
                if (!state.clkctxdata){
                    state.clkctxdata = [action.payload]
                }else{
                    state.clkctxdata = [action.payload, ...state.clkctxdata.filter(item => item.id !== action.payload.id)]
                }
            }
        },
        REMOVE_ROW_DATA: (state=initialState, action) => {
            if (action.payload){
                state.clkctxdata = [...state.clkctxdata.filter(item => item.id !== action.payload)]
            }
        },
        UPD_DISP_SETTINGS: (state=initialState, action) => {
            if (action.payload){
                state.dispsettings = {...state.dispsettings,...action.payload}
            }
        },
        HIDE_BOTTOM_CONT: (state=initialState, action) => {
            let settingval = {maincontht:90,mainconthttp:"vh",showBottomContainer:false}
            state.dispsettings = {...state.dispsettings,...settingval}
        },
        SHOW_BOTTOM_CONT: (state=initialState, action) => {
            let settingval = {maincontht:70,mainconthttp:"vh",showBottomContainer:true}
            state.dispsettings = {...state.dispsettings,...settingval}
        },
        ADD_STK_STREAM: (state=initialState, action) => {
            console.log("ADD_STK_STREAM",action.payload)
            if (state.streamstocks){
                state.streamstocks = Array.from(new Set([...state.streamstocks,...action.payload]))
            }else{
                state.streamstocks = action.payload
            }
        },
    }
}) 

export const {UPD_ROW_COUNTS,CLICKED_ROW_DATA,REMOVE_ROW_DATA,UPD_DISP_SETTINGS,HIDE_BOTTOM_CONT,SHOW_BOTTOM_CONT,ADD_STK_STREAM} = stockScreenerSlice.actions;
export default stockScreenerSlice.reducer;