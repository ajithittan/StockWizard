import { createContext, useContext,useState,useEffect } from 'react';
import {getUserStocks} from '../../modules/api/UserPreferences'

const AppContext = createContext();

export function AppWrapper({ children }) {

  const [stkList,setStkList] = useState(null)

  useEffect(async () =>{
      let stklist = await getUserStocks()
      //const arrStks = Array.from(Object.values(stklist), item => item.symbol)
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