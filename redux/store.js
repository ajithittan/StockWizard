import {configureStore} from '@reduxjs/toolkit';
import  profileReducer from './reducers/profileDashSlice';
import portfolioStockReducer from './reducers/portfolioStockSlice'
import companyStatsReducer from './reducers/companyStatsSlice'
import chartDataReducer from './reducers/chartDataSlice'
import streamQuotesReducer from './reducers/streamingQuotesSlice'
import stockalertsReducer from './reducers/stockAlertsSlice'
import stockpatternReducer from './reducers/stockPatternsSlice'
import chartDrillReducer from './reducers/chartDrillSlice'
import stockSearchReducer from './reducers/stockSearchAdvSlice'

export default configureStore({
    reducer:{
        dashboardlayout: profileReducer,
        porfoliostock: portfolioStockReducer,
        companystats:companyStatsReducer,
        chartdata:chartDataReducer,
        streamingquotes:streamQuotesReducer,
        stockalerts:stockalertsReducer,
        stockpatterns:stockpatternReducer,
        chartdrill:chartDrillReducer,
        stocksearchddv:stockSearchReducer
    }
})