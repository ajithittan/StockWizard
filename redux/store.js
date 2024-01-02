import {configureStore} from '@reduxjs/toolkit';
import  profileReducer from './reducers/profileDashSlice';
import portfolioStockReducer from './reducers/portfolioStockSlice'
import companyStatsReducer from './reducers/companyStatsSlice'
import chartDataReducer from './reducers/chartDataSlice'
import streamQuotesReducer from './reducers/streamingQuotesSlice'

export default configureStore({
    reducer:{
        dashboardlayout: profileReducer,
        porfoliostock: portfolioStockReducer,
        companystats:companyStatsReducer,
        chartdata:chartDataReducer,
        streamingquotes:streamQuotesReducer
    }
})