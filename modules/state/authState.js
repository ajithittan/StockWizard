import { createContext, useContext,useState,useEffect } from 'react';
import {getLoggedInStatus} from '../login/auth'
import { useRouter } from 'next/router'

const AuthContext = createContext();

export function AuthWrapper({ children }) {

  const router = useRouter()

  useEffect(async () =>{
      let authStatus = await getLoggedInStatus()
      if (authStatus.data === false){
        console.log("before redirecting AuthWrapper")  
        router.push("/Login")
      }
  },[])
  
  return (
    <AuthContext.Provider>
      {children}
    </AuthContext.Provider>
  );
}