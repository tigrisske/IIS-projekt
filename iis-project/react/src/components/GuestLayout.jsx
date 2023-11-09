import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useStateContext } from "./Context";
import { Navigate } from "react-router-dom";
import GuestHeader from "./GuestHeader";
import './Main.css';

export default function GuestLayout() {

    return (
        <div className="main">
            <header className="header">
                <GuestHeader />
            </header>
            <div className="app-body">
                <Outlet />
            </div>
        </div>
    )
}
