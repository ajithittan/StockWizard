import {createAsyncThunk,createSlice} from '@reduxjs/toolkit';
import {saveStockAlerts,getStockAlerts} from '../../modules/api/UserAlerts'

const mapping_type_chartElement = {"ALERT":"STRAIGHTLINE"}

export const addStockPriceAlerts = createAsyncThunk("chartdataslice/addchartdata",async(obj,thunkAPI)=>{
    thunkAPI.dispatch(ADD_ELEMENTS_TO_CHART([obj]))
    saveStockAlerts(obj.chartdata)
}) 

const standardizeDataFromDb = (inpData) =>{
    return inpData.map(obj => ({ ...obj, chartdata:{close:obj.threshold,id:obj.id}}))
}

export const getNotificationsForChart = createAsyncThunk("chartdataslice/addchartdata",async(inpFromDb,thunkAPI)=>{
    thunkAPI.dispatch(ADD_ELEMENTS_TO_CHART(standardizeDataFromDb(inpFromDb)))
}) 

const chartDataSlice = createSlice({
    name: 'chartdata',
    initialState: {
        initialchartdata: null,
        deletedchartelements:null,
        chartelements:null,
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
        HIDE_ADDED_ITEMS_FROM_DB:(state=initialState, action) => {
            if(action.payload){
                if (state.chartelements){
                    const stock = action.payload[0].symbol
                    const indx = state.chartelements.findIndex(item => item.symbol === stock)
                    if (indx > -1){
                        let obj = {}
                        obj.ids = state.chartelements[indx].chartelements.map(item => item.id).filter(item => item)
                        obj.symbol = stock
                        if(state.deletedchartelements){
                            const ind = state.deletedchartelements.findIndex(item => item.symbol === stock)
                            if (ind > -1){
                                state.deletedchartelements[ind] = obj
                            }else{
                                state.deletedchartelements.push(obj) 
                            }      
                        }else{
                            state.deletedchartelements = [obj]
                        }
                        state.chartelements[indx].chartelements = [...state.chartelements[indx].chartelements.filter(item => !action.payload.map(inner => inner.id).includes(item.id))]
                    }
                }
            }
        },
        RESET_REMOVED_ITEMS:(state=initialState, action) => {
            if(action.payload){
                if (state.deletedchartelements){
                    const stock = action.payload.symbol
                    const indx = state.deletedchartelements.findIndex(item => item.symbol === stock)
                    if (indx > -1){
                        if(state.deletedchartelements){
                            state.deletedchartelements[indx].ids = state.deletedchartelements[indx]?.ids.filter(item => !action.payload.ids.includes(item))
                        }
                    }
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

export const {INITIAL_CHART_DATA,ADD_ELEMENTS_TO_CHART,DELETE_FROM_ADDED_ITEMS,
    HIDE_ADDED_ITEMS_FROM_DB,INITIAL_CHART_ELEMENTS,RESET_REMOVED_ITEMS} = chartDataSlice.actions;
export default chartDataSlice.reducer;