import {configureStore} from '@reduxjs/toolkit';
import  profileReducer from './reducers/profileDashSlice';
import portfolioStockReducer from './reducers/portfolioStockSlice'
import companyStatsReducer from './reducers/companyStatsSlice'


export default configureStore({
    reducer:{
        dashboardlayout: profileReducer,
        porfoliostock: portfolioStockReducer,
        companystats:companyStatsReducer
    }
})
