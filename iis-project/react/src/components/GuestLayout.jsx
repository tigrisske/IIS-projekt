import { useState } from "react";
import {Outlet} from "react-router-dom";
import { useStateContext } from "./Context";
import { Navigate } from "react-router-dom";
import GuestHeader from "./GuestHeader";
import './Main.css';

export default function GuestLayout(){

  const {is_logged} = useStateContext();
  if (is_logged) { 
    return <Navigate to="/" />
  }  


    return(
        <div className="main">
          <header className="header">
            <GuestHeader/>
            </header>
          <div className="form">
            <Outlet />
          </div>
        </div>
        )
}
