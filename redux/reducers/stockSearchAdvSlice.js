import {createAsyncThunk,createSlice} from '@reduxjs/toolkit';
import {getStockAlertQuery,delStockAlertQuery} from '../../modules/api/UserAlerts'

export const getAlertQueries = createAsyncThunk("stockSearchAdvSlice/getQueryAlert",async(inpval,thunkAPI)=>{
    getStockAlertQuery().then(retval => thunkAPI.dispatch(ADD_SAVED_QRY(retval)))
}) 

export const delSavedQuery = createAsyncThunk("stockSearchAdvSlice/delSavedQry",async(obj,thunkAPI)=>{
    thunkAPI.dispatch(REMOVE_SAVED_QRY(obj))
    delStockAlertQuery(obj["id"])
  })  

const stockSearchAdv = createSlice({
    name: 'stocksearchddv',
    initialState: {
        searchquery: [],
        searchautofill:[
            {label: 'Large Caps' , query:{type:"mcap",param:0,op:">",val:10000000000}},
            {label: 'Mid Caps' , query:{type:"mcap",param:0,op:"bet",val:[2000000000 , 10000000000]}},
            {label: 'Small Caps' , query:{type:"mcap",param:0,op:"<",val:2000000000}},
            {label: 'Bullish Patterns' , query:{type:"pattern_***_",param:0,op:"not_like",val:'null'}},
            {label: 'close < 50D Moving Avg', query:{type:"close",param:0,op:"<",val:"SMA_50"}},
            {label: '200 day SMA > 50 day SMA' , query:{type:"SMA",param:200,op:">",val:"SMA_50"}},
            {label: '200 day SMA > close' , query:{type:"SMA",param:200,op:">",val:"close"}},
            {label: '14 Day RSI < 30' , query:{type:"rsi",param:14,op:"<",val:30}},
            {label: '14 Day RSI > 80' , query:{type:"rsi",param:14,op:">",val:80}}],
        searchsavedquery:[],    
        loading:true
    },
    reducers: {
        ADD_QUERY_TO_SEARCH: (state=initialState, action) => {
            state.searchquery = [...state.searchquery,action.payload]
        },
        ADD_MULTIPLE_QUERIES_SEARCH: (state=initialState, action) => {
            state.searchquery = [...state.searchquery,...action.payload]
        },
        REMOVE_QUERY_FROM_SEARCH : (state=initialState, action) => 
        {
            state.searchquery = state.searchquery.filter(item => item.label !== action.payload["label"])
        },
        ADD_TO_AUTO_FILL: (state=initialState, action) => {
            state.searchautofill = [...state.searchautofill,action.payload]
        },
        ADD_SAVED_QRY: (state=initialState, action) => {
            if (action.payload && action.payload.length >0){
                let arrqrys=[]
                for (let i=0;i<action.payload.length;i++){
                    let qry = {}
                    qry['label'] = action.payload[i]["queryname"]
                    qry['query'] = action.payload[i]["query"]
                    qry['type'] = action.payload[i]["type"]
                    qry['color'] = "#FFFFFF"
                    qry['id'] = action.payload[i]["id"]
                    arrqrys.push(qry)
                }
                state.searchautofill = [...state.searchautofill,...arrqrys]
                state.searchsavedquery=[...arrqrys]
            }
        },
        REMOVE_SAVED_QRY: (state=initialState, action) => {
            state.searchsavedquery = state.searchsavedquery.filter(item => item.id !== action.payload.id)
            state.searchautofill = state.searchautofill.filter(item => item.id !== action.payload.id)
        },
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getAlertQueries.pending,(state)=>{
            state.loading=true
        })
        .addCase(getAlertQueries.fulfilled,(state,action)=>{
            state.loading=false
            state.stockList=action.payload
        })
        .addCase(getAlertQueries.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message
        })
    }        
}) 

export const {ADD_QUERY_TO_SEARCH,REMOVE_QUERY_FROM_SEARCH,ADD_TO_AUTO_FILL,ADD_SAVED_QRY,ADD_MULTIPLE_QUERIES_SEARCH,
    REMOVE_SAVED_QRY} = stockSearchAdv.actions;
export default stockSearchAdv.reducer;
