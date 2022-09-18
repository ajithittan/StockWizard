import { PropaneSharp } from "@mui/icons-material";
import { useEffect, useState } from "react";
import {googleSuccessfulAuth} from '../../../modules/login/googlehandler'
import Image from 'next/image'
import googlebtn from './googlebtn.png'

const GoogleLoginComponent = (props) => {

  return (
    <>
        <div>
          <a href="/auth/google"><Image src={googlebtn} width={190} height={45} ></Image></a>
        </div>
    </>
  );
};

export default GoogleLoginComponent