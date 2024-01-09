import {createAsyncThunk,createSlice} from '@reduxjs/toolkit';
import {saveStockAlerts,getStockAlerts} from '../../modules/api/UserAlerts'

const mapping_type_chartElement = {"ALERT":"STRAIGHTLINE"}

export const addStockPriceAlerts = createAsyncThunk("chartdataslice/addchartdata",async(obj,thunkAPI)=>{
    thunkAPI.dispatch(ADD_ELEMENTS_TO_CHART([obj]))
    saveStockAlerts(obj.chartdata)
}) 

const standardizeDataFromDb = (inpData) =>{
    return inpData.map(obj => ({ ...obj, chartdata:{close:obj.threshold}}))
}

export const getNotificationsForChart = createAsyncThunk("chartdataslice/addchartdata",async(stock,thunkAPI)=>{
    getStockAlerts(stock).then(retval => thunkAPI.dispatch(ADD_ELEMENTS_TO_CHART(standardizeDataFromDb(retval))))
}) 

const chartDataSlice = createSlice({
    name: 'chartdata',
    initialState: {
        initialchartdata: null,
        chartelements:null,
        test:null,
        loading:true
    },
    reducers: {
        INITIAL_CHART_DATA: (state=initialState, action) => {
            if (state.initialchartdata){
                const indx = state.initialchartdata.findIndex(item => item.symbol === action.payload.symbol)
                if (indx > -1){
                    state.initialchartdata[indx] = action.payload
                }else{
                    state.initialchartdata.push(action.payload)
                }
            }else{
                state.initialchartdata = [action.payload]
            }
        },
        INITIAL_CHART_ELEMENTS:(state=initialState, action) => {
            if(action.payload){
                if (state.chartelements){
                    const indx = state.chartelements.findIndex(item => item.symbol === action.payload.symbol)
                    if (indx > -1){
                        const tempvals = action.payload.chartelements.map(item => item.charttype)
                        const fullset = state.chartelements[indx].chartelements.map(item => item.charttype)
                        let difference = tempvals.filter(x => !fullset.includes(x));
                        if (difference.length > 0){
                            state.chartelements[indx] = action.payload
                        }
                    }else{
                        state.chartelements.push(action.payload)
                    }    
                }else{
                    state.chartelements = [action.payload]
                }
            }
        },
        ADD_ELEMENTS_TO_CHART:(state=initialState, action) => {
            if(action.payload && action.payload.length >0){
                const indx = state.chartelements.findIndex(item => item.symbol === action.payload[0].symbol)
                let inpobj = [...action.payload]
                inpobj = inpobj.map(obj => ({ ...obj, charttype: mapping_type_chartElement[obj.type]}))
                state.chartelements[indx]?.chartelements?.push(...inpobj)
            }
        },
        DELETE_FROM_ADDED_ITEMS:(state=initialState, action) => {
            if(action.payload){
                if (state.chartelements){
                    state.chartelements = state.chartelements.filter(item => item.id !== action.payload)
                }
            }
        },
        DELETE_FROM_ADDED_ITEMS_BY_TYPE:(state=initialState, action) => {
            if(action.payload){
                if (state.chartelements){
                    state.chartelements = state.chartelements.filter(item => item.type !== action.payload)
                }
            }
        }

    },
}) 

export const {INITIAL_CHART_DATA,ADD_ELEMENTS_TO_CHART,DELETE_FROM_ADDED_ITEMS,INITIAL_CHART_ELEMENTS} = chartDataSlice.actions;
export default chartDataSlice.reducer;