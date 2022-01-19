import lru from 'lru-cache';   

const cache = lru({                                                     
    maxAge: 300000,                                                       
    max: 500000000000,                                                   
    length: (n) => {                                                     
      // n = item passed in to be saved (value)
      return n.length * 100;
    }
  });
   
   const setCache = (key, value) => {                                   
    cache.set(key, value);
  };
   
  const getCache = (key) => {                                         
    return cache.get(key);
  };
   
  export {
    setCache,
    getCache
  };