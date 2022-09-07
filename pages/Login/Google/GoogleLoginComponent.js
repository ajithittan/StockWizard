import { useEffect, useState } from "react";
import {googleSuccessfulAuth} from '../../../modules/login/googlehandler'

const GoogleLoginComponent = () => {

   useEffect(() =>{
        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        document.body.appendChild(script);
   },[]) 

   const callBackFromGoogle = async (authCreds)  => {
    await googleSuccessfulAuth(authCreds)    
    window.location.reload()
    }

  useEffect (() =>{
    window.callBackFromGoogle = callBackFromGoogle
  },[])  

  return (
    <>
        <div id="g_id_onload"
            data-client_id="289288660745-sm918of4as0ssurtrv1s7m31ioudud8g.apps.googleusercontent.com"
            data-context="signin"
            data-ux_mode="popup"
            data-callback="callBackFromGoogle"
            data-auto_prompt="false">
        </div>
        <div className="g_id_signin"
            data-type="standard"
            data-shape="rectangular"
            data-theme="filled_blue"
            data-text="signin_with"
            data-size="large"
            data-logo_alignment="left">
        </div>
    </>
  );
};

export default GoogleLoginComponent