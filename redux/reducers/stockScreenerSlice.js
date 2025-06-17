import {createSlice} from '@reduxjs/toolkit';

const stockScreenerSlice = createSlice({
    name: 'stockscreener',
    initialState: {
        stockscreener: null,
        rowcount:100,
        loading:true
    },
    reducers: {
        UPD_ROW_COUNTS: (state=initialState, action) => {
            if (action.payload){
                state.rowcount = action.payload
            }
        }
    }
}) 

export const {UPD_ROW_COUNTS} = stockScreenerSlice.actions;
export default stockScreenerSlice.reducer;