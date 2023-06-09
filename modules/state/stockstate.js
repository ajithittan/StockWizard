import { createContext, useContext,useState,useEffect } from 'react';
import {getUserStocks} from '../../modules/api/UserPreferences'
import {initiateStreaming} from '../../modules/api/StockStream'

const AppContext = createContext();

export function AppWrapper({ children }) {

  const [stkList,setStkList] = useState(null)

  useEffect(async () =>{
      let stklist = await getUserStocks()
      console.log("global state invocation?",stklist)
      setStkList(stklist)
      initiateStreaming(stklist)
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