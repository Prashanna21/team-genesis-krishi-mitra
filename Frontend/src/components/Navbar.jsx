import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoginStatus } from "../app/infoSlice";
import { FaBars, FaTimes, FaStore, FaInfoCircle, FaUser } from "react-icons/fa";
import { Link, useLocation, useParams } from "react-router-dom";

function Navbar() {
  const param = useLocation().pathname;
  console.log(param);
  const dispatch = useDispatch();

  dispatch(setLoginStatus(true));

  const loginStatus = useSelector((state) => state.isUserLoggedIn);
  console.log(loginStatus);

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative mb-3">
      <nav className="fixed top-0 left-0 w-full z-50 bg-yellow-50 p-4 flex items-center justify-between shadow-md">
        {/* Logo and title */}
        <Link className="">
          <div className="flex flex-row ">
            <img src="logo.png" alt="Krishi Mitra" className="h-10 w-10" />
          </div>
        </Link>
        <span className="text-green-800 text-2xl font-bold text-center">
          {param === "/"
            ? "Krishi Mitra"
            : param === "/marketplace"
            ? "MarketPlace"
            : param === "/about"
            ? "Login"
            : param === "/login"
            ? "About Us"
            : "Krishi Mitra"}
        </span>
        {/* Hamburger button */}
        <button
          onClick={() => {
            setMenuOpen(!menuOpen);
          }}
          className="text-3xl text-green-900 focus:outline-none transition-transform duration-200"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Sliding menu */}
        <div
          className={`absolute top-0 right-14 h-14 mt-2 bg-green-800 text-white rounded-full px-4 py-2 flex gap-3 items-center transition-all duration-300 ease-in-out transform
    ${
      menuOpen
        ? "translate-x-0 opacity-100"
        : "translate-x-10 opacity-0 pointer-events-none"
    }
  `}
        >
          <Link
            to="/marketplace"
            className="flex items-center gap-1 px-3 py-1 bg-green-600 rounded-full hover:bg-green-700 text-sm"
            onClick={() => setMenuOpen(false)}
          >
            <FaStore /> MarketPlace
          </Link>
          <Link
            to="/"
            className="flex items-center gap-1 px-3 py-1 bg-green-600 rounded-full hover:bg-green-700 text-sm"
            onClick={() => setMenuOpen(false)}
          >
            <FaInfoCircle /> About us
          </Link>
          <Link
            to="/login"
            className="flex items-center gap-1 px-3 py-1 bg-green-600 rounded-full hover:bg-green-700 text-sm"
            onClick={() => setMenuOpen(false)}
          >
            <FaUser /> Login
          </Link>
        </div>
      </nav>

      {/* Push content below the navbar */}
      <div className="pt-20"></div>
    </div>
  );
}

export default Navbar;
