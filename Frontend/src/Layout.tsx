import { useState } from 'react'
import './App.css'
import { Button } from './components/ui/button'
import { Outlet } from "react-router-dom";
import NavBar from './components/NavBar';
import Footer from './components/Footer';

function Layout() {

  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  )
}

export default Layout;