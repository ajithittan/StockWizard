import { createContext, useContext } from 'react';
import StockList from './api/stocklist'

const AppContext = createContext();

export function AppWrapper({ children }) {
  let sharedState = StockList()

  return (
    <AppContext.Provider value={sharedState}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}