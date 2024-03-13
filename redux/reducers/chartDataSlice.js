import {createAsyncThunk,createSlice} from '@reduxjs/toolkit';
import {getRandomColor} from '../../modules/utils/UtilFunctions'

const mapping_type_chartElement = {"ALERT":"STRAIGHTLINE","SAR":"STRAIGHTLINE","LINE":"LINE","AXIS":"AXIS","IMAGE":"IMAGE"}

const standardizeDataFromDb = (inpData) =>{
    if (inpData.type === "ALERT"){
        return inpData.data.map(obj => ({ ...obj, chartdata:{close:obj.threshold,id:obj.id,update:true}}))
    }else if (inpData.type === "IMAGE"){
        return [{...inpData,chartdata:inpData.data}]
    }else{
        return inpData.map(obj => ({ ...obj, chartdata:{close:obj.data,id:obj.id,update:false}}))
    }
}

export const addItemsToChart = createAsyncThunk("chartdataslice/addchartdata",async(inpFromDb,thunkAPI)=>{
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
            const checkAndAdjust = (inpData) => {
                const index = state.initialchartdata.findIndex(item => item.symbol === inpData[0].symbol)
                return [...inpData.reverse().splice(0,state.initialchartdata[index].chartfulldata.length).reverse()]
            }
            
            const getNormalizedData = (obj) =>{
                if (obj.normalize){ 
                    let normalizedData = checkAndAdjust(obj.chartdata)
                    return { ...obj,chartdata:normalizedData,color:getRandomColor(),id:obj.id, charttype: mapping_type_chartElement[obj.type]}
                }else{
                    return { ...obj, charttype: mapping_type_chartElement[obj.type]}
                }
            }
            if(action.payload && action.payload.length >0){
                const indx = state.chartelements.findIndex(item => item.symbol === action.payload[0].symbol)
                let inpobj = [...action.payload]
                inpobj = inpobj.map(obj => (getNormalizedData(obj)))
                state.chartelements[indx]?.chartelements?.push(...inpobj)
                //const indx1 = state.initialchartdata.findIndex(item => item.symbol === action.payload[0].symbol)
                //state.initialchartdata[indx1].chartfulldata = action.payload[0].chartdata
                //console.log("inpobj",state.initialchartdata)
            }
        },
        HIDE_ADDED_ITEMS_IN_CHART:(state=initialState, action) => {
            if(action.payload){
                if (state.chartelements){
                    const stock = action.payload[0].symbol
                    const indx = state.chartelements.findIndex(item => item.symbol === stock)
                    if (indx > -1){
                        let obj = {}
                        obj.ids = action.payload.map(item => item.id)
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
        }
    }
}) 

export const {INITIAL_CHART_DATA,ADD_ELEMENTS_TO_CHART,HIDE_ADDED_ITEMS_IN_CHART,INITIAL_CHART_ELEMENTS,RESET_REMOVED_ITEMS} = chartDataSlice.actions;
export default chartDataSlice.reducer;