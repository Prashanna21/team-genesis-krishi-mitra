import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

function Footer() {
  const nav = [
    { name: "Home", href: "/" },
    { name: "Generate Report", href: "/generate-report" },
    { name: "MarketPlace", href: "/market-place" },
    { name: "Login", href: "/login" },
  ];

  return (
    <footer className="bg-slate-900 text-white py-6 border-t-4 border-emerald-500">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Left side */}
        <div className="text-center md:text-left">
          <img
            src="/logo.png"
            alt="Krishi Mitra Logo"
            className="w-16 h-16 rounded-xl mb-2 mx-auto md:mx-0"
          />
          <h4 className="font-bold text-xl">
            <span className="text-emerald-500">Krishi</span> Mitra
          </h4>
          <p className="text-sm">Empowering Farmers. Growing Together.</p>
          <p className="text-sm text-amber-200 mt-2">
            &copy; {new Date().getFullYear()} Krishi Mitra. All rights reserved.
          </p>
        </div>

        {/* Center - Links */}
        <div className="flex gap-4 text-sm font-medium">
          {nav.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="hover:text-emerald-500 transition-colors duration-300"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Right side - Social icons */}
        <div className="flex gap-4 text-xl">
          <a href="#">
            <FaFacebook className="hover:text-green-700" />
          </a>
          <a href="#">
            <FaInstagram className="hover:text-green-700" />
          </a>
          <a href="#">
            <FaTwitter className="hover:text-green-700" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
