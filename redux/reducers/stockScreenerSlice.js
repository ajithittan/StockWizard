import {createSlice} from '@reduxjs/toolkit';

const stockScreenerSlice = createSlice({
    name: 'stockscreener',
    initialState: {
        stockscreener: null,
        rowcount:50,
        loading:true,
        clkctxdata:[{id:"INTRA_DAY",type:"INTRA_DAY"}],
        dispsettings:{showMainContainer:true,maincontht:70,mainconthttp:"vh",restcontht:20,restconthttp:"vh"}
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
            console.log("action.payload",action.payload)
            if (action.payload){
                state.clkctxdata = [...state.clkctxdata.filter(item => item.id !== action.payload)]
            }
        },
        UPD_DISP_SETTINGS: (state=initialState, action) => {
            if (action.payload){
                state.dispsettings = {...state.dispsettings,...action.payload}
            }
        },

    }
}) 

export const {UPD_ROW_COUNTS,CLICKED_ROW_DATA,REMOVE_ROW_DATA,UPD_DISP_SETTINGS} = stockScreenerSlice.actions;
export default stockScreenerSlice.reducer;