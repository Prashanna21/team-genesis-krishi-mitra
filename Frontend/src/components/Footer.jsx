import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-yellow-50 text-green-900 py-6 mt-10 border-t border-green-200">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Left side */}
        <div className="text-center md:text-left">
          <h4 className="font-bold text-xl">Krishi Mitra</h4>
          <p className="text-sm">Empowering Farmers. Growing Together.</p>
        </div>

        {/* Center - Links */}
        <div className="flex gap-4 text-sm font-medium">
          <a href="#" className="hover:underline">
            MarketPlace
          </a>
          <a href="#" className="hover:underline">
            About Us
          </a>
          <a href="#" className="hover:underline">
            Contact
          </a>
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

      <div className="text-center text-xs mt-4 text-green-800">
        © {new Date().getFullYear()} Krishi Mitra. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
