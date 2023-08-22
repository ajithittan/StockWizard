import {configureStore} from '@reduxjs/toolkit';
import  profileReducer from './reducers/profileDashSlice';
import portfolioStockReducer from './reducers/portfolioStockSlice'


export default configureStore({
    reducer:{
        dashboardlayout: profileReducer,
        porfoliostock: portfolioStockReducer
    }
})
