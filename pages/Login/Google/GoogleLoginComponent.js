import { PropaneSharp } from "@mui/icons-material";
import { useEffect, useState } from "react";
import {googleSuccessfulAuth} from '../../../modules/login/googlehandler'
import Image from 'next/image'
import googlebtn from './googlebtn.png'

const GoogleLoginComponent = (props) => {

   useEffect(() =>{
        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        document.body.appendChild(script);
   },[]) 

   const callBackFromGoogle = async (authCreds)  => {
    await googleSuccessfulAuth(authCreds)    
    //window.location.reload()
    props.status()
    }

  useEffect (() =>{
    window.callBackFromGoogle = callBackFromGoogle
  },[])  

  return (
    <>
        <div>
          <a href="/auth/google"><Image src={googlebtn} width={230} height={45} ></Image></a>
        </div>
    </>
  );
};

export default GoogleLoginComponent