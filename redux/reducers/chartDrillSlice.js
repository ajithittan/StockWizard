import {createSlice} from '@reduxjs/toolkit';

const chartDrillSlice = createSlice({
    name: 'chartdrill',
    initialState: {
        allchartdata: null,
        selectedstocks:null,
        loading:true
    },
    reducers: {
        SET_SELECT_STOCKS: (state=initialState, action) => {
            if (action.payload){
                state.selectedstocks = action.payload
            }
        }
    }
}) 

export const {SET_SELECT_STOCKS} = chartDrillSlice.actions;
export default chartDrillSlice.reducer;