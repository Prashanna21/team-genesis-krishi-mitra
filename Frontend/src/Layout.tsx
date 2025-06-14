import { useEffect, useState } from 'react'
import './App.css'
import { Button } from './components/ui/button'
import { Outlet } from "react-router-dom";
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { useDispatch } from 'react-redux';
import { setUserInfo, setLoginStatus } from "./app/infoSlice.js";

function Layout() {

   const dispatch = useDispatch();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    const isUserLoggedIn = localStorage.getItem("isUserLoggedIn");

    if (userInfo && isUserLoggedIn === "true") {
      dispatch(setUserInfo(JSON.parse(userInfo)));
      dispatch(setLoginStatus(true));
    }
  }, [dispatch]);

  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  )
}

export default Layout;