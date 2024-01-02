import { createContext, useContext, useEffect, useState } from 'react';

const PriceChartContext = createContext();

export function PriceChartWrapper({ children }) {

  const [chartState,setChartState] = useState(null)
 
  const changeChartState = (inpvals) =>{
    setChartState(inpvals)
  }

  return (
    <PriceChartContext.Provider value={[chartState,changeChartState]} >
      {children}
    </PriceChartContext.Provider>
  );
}

export function usePriceChartContext() {
  return useContext(PriceChartContext);
}