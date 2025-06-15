import { NavLink } from "react-router-dom";
import { FaHome, FaShoppingCart } from "react-icons/fa";
import {IoIosPaper} from "react-icons/io"
import { IoPerson } from "react-icons/io5";
import { GrMenu } from "react-icons/gr";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useTranslation } from "react-i18next";

import TranslationBtn from "./TranslationBtn";
const Navbar = () => {



  interface pageObg {
    name: string;
    path: string;
    icon: React.ElementType;
  }

  const pages: pageObg[] = [
    { name: "Home", path: "/", icon: FaHome },
    {name:"Generate Report", path:"/farmer/generate-report", icon:IoIosPaper},
    { name: "Marketplace", path: "/marketplace", icon: FaShoppingCart },
    { name: "Login", path: "/login", icon: IoPerson },
  ]

  const [isOpen, setIsOpen] = useState(false);

  return <header className="w-full bg-white shadow-md sticky top-0 z-50">

    <div className="w-full max-w-6xl mx-auto bg-white p-4 px-8 flex gap-8 justify-between items-center">

      <NavLink to="/" className="w-fit flex gap-4 justify-center items-center">
        <img src="/logo.png" alt="Logo" className="w-10 h-10" />
        <span className="text-emerald-500 font-bold text-lg hidden md:flex">
          Krishi <span className="text-slate-800">Mitra</span>
        </span>
      </NavLink>

      <nav className="gap-8 hidden md:flex">
        {pages.map((page) => (
          <NavLink
            key={page.name}
            to={page.path}
            className={({ isActive }) =>
              `flex items-center gap-2 text-md font-semibold ${isActive ? "text-emerald-500" : "text-slate-800"}`
            }
          >
            <page.icon className="w-5 h-5" />
            {page.name}
          </NavLink>
        
        )
        )}

        <TranslationBtn />
      </nav>

      <nav className="flex md:hidden justify-center gap-2 items-center">
<TranslationBtn className="" />

        <div className="overflow-hidden">
          <button className="w-fit text-xl text-slate-700" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <RxCross2 className="w-7 h-7" /> : <GrMenu className="w-7 h-7" />}
          </button>

          <div className={`fixed flex flex-col gap-4 z-50 top-18 w-[200px] rounded-tl-none bottom-0 ${isOpen ? "right-0" : "right-[-300px]"} bg-slate-100 shadow-lg rounded-lg p-4 transition-all duration-300`}>
            {pages.map((page) => (
              <NavLink
                key={page.name}
                to={page.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 p-2 rounded-xl shadow-md justify-center px-4 text-md font-semibold mb-2 ${isActive ? "text-emerald-500 bg-slate-800" : "text-slate-800 bg-slate-200 hover:bg-slate-300"}`
                }
              >
                <page.icon className="w-5 h-5" />
                {page.name}
              </NavLink>
            ))}

            

          </div>
        </div>
      </nav>


    </div></header>;
};

export default Navbar;
