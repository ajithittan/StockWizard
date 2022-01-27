import { createContext, useContext,useState,useEffect } from 'react';
import StockList from './api/stocklist'

const AppContext = createContext();

export function AppWrapper({ children }) {

  const [stkList,setStkList] = useState(null)

  useEffect(async () =>{
      let stklist = await StockList()
      console.log("here?",stklist)
      setStkList(stklist)
  },[])

  return (
    <AppContext.Provider value={stkList}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}