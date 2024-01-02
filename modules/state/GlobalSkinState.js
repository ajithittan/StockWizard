import { createContext, useContext, useEffect, useState } from 'react';

const AppSkinContext = createContext();
const allSkinState = [{header:'blu',footer:'blu',id:0},{header:'blu',footer:'blu',id:1},{header:'blu',footer:'blu',id:2}]

const getSessionVal = () => {
  return localStorage.getItem("theme") || 1
}


export function AppSkinWrapper({ children }) {

  const [skinState,setskinState] = useState(allSkinState[0])

  useEffect(() =>{
    setskinState(allSkinState[getSessionVal()])
  },[])

  const changeSkinState = (newvalue) =>{
    setskinState(allSkinState[newvalue])
    localStorage.setItem("theme",newvalue)
  }

  return (
    <AppSkinContext.Provider value={[skinState,changeSkinState]} >
      {children}
    </AppSkinContext.Provider>
  );
}

export function useAppSkinContext() {
  return useContext(AppSkinContext);
}