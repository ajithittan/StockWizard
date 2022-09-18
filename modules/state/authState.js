import { createContext, useContext,useState,useEffect } from 'react';
import {getLoggedInStatus} from '../login/auth'
import { useRouter } from 'next/router'

const AuthContext = createContext();

export function AuthWrapper({ children }) {

  const router = useRouter()
  const [authStatus,setauthStatus] = useState(false)

  useEffect(async () =>{
      let authStatus = await getLoggedInStatus()
      if (authStatus.data === false){
        router.push("/Login")
      }
  },[])

  const changeAuthStatus = (newvalue) =>{
    console.log("changed auth status to - ",newvalue)
    setauthStatus(newvalue)
  }

  return (
    <AuthContext.Provider value={[authStatus,changeAuthStatus]} >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthWrapperContext() {
  return useContext(AuthContext);
}