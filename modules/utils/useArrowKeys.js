import {useState,useEffect } from 'react';

const useArrowKeys = () => {
  const retKeys =  {40:"D", 39:"R", 38:"U", 37:"L"}  
  const [
    keyType,
    setKeyType
  ] = useState(null);

  useEffect(() => {
    const updateKeyClicked = ev => {
      if (ev.keyCode in retKeys)  {
        setKeyType(retKeys[ev.keyCode])
      }
    };
    window.addEventListener('keydown', updateKeyClicked);
    return () => {
    window.removeEventListener('keydown', updateKeyClicked);
    };
  }, []);
  return keyType;
};

export default useArrowKeys;