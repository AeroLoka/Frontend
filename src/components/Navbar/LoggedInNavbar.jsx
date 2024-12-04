import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
import searchIcon from "../../assets/icons/fi_search.svg";
import loginIcon from "../../assets/icons/fi_log-in.svg";
import menuIcon from "../../assets/icons/fi_menu.svg";
import listIcon from "../../assets/icons/fi_list.svg";
import bellIcon from "../../assets/icons/fi_bell.svg";
import userIcon from "../../assets/icons/fi_user.svg";

const LoggedInNavbar = () => {
  const [isToggleMenuOpen, setToggleMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setToggleMenuOpen(!isToggleMenuOpen);
  };

  return (
    <>
      <nav className="w-full h-[84px] bg-white shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto h-full flex items-center justify-between px-4">
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="h-[53px]" />
          </div>

          <div className="flex-1 mx-8 hidden lg:block">
            <div className="relative w-full max-w-[444px]">
              <input
                type="text"
                placeholder="Cari di sini ..."
                className="w-full h-[48px] bg-[#EEEEEE] pl-4 pr-14 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
              />
              <img
                src={searchIcon}
                alt="Search Icon"
                className="absolute top-1/2 right-4 transform -translate-y-1/2 w-5 h-5 cursor-pointer"
              />
            </div>
          </div>

          <div className="hidden lg:flex gap-6 ">
            <button aria-label="Open List">
              <img src={listIcon} alt="" />
            </button>
            <button aria-label="Open Notification">
              <img src={bellIcon} alt="" />
            </button>
            <button aria-label="Open User">
              <img src={userIcon} alt="" />
            </button>
          </div>

          <div className="lg:hidden">
            <button onClick={toggleMobileMenu}>
              <img
                src={menuIcon}
                alt="Hamburger Menu Icon"
                className="h-[30px]"
              />
            </button>
          </div>
        </div>

        <div
          id="mobile-menu"
          className={`lg:hidden bg-white shadow-md p-4 ${
            isToggleMenuOpen ? "" : "hidden"
          }`}
        >
          <div className="relative w-full max-w-[444px] mb-4">
            <input
              type="text"
              placeholder="Cari di sini ..."
              class="w-full h-[48px] bg-[#EEEEEE] pl-4 pr-14 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
            <img
              src={searchIcon}
              alt="Search Icon"
              className="absolute top-1/2 right-4 transform -translate-y-1/2 w-5 h-5 cursor-pointer"
            />
          </div>
          <div>
            <a
              href="#"
              className="flex items-center justify-center w-full h-[48px] bg-[#7126B5] text-white rounded-[12px] text-sm font-medium hover:bg-purple-800"
            >
              <img src={loginIcon} alt="Login Icon" />
              Masuk
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default LoggedInNavbar;
