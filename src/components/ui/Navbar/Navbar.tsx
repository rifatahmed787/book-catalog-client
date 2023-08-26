import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import colorLogo1 from "../../../assets/logo/logo.svg";
import { Icon } from "@iconify/react";
import "./Navbar.css";
import { DarkModeContext } from "@/components/DarkModeContext/DarkModeContext";
import Account from "./Account";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const { darkMode, isBangla } = useContext(DarkModeContext);

  //navbar color change effect
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 200) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  //for blog
  const toggleAccountDropdown = () =>
    setAccountDropdownOpen(!accountDropdownOpen);
  const accountDropdownClose = () => setAccountDropdownOpen(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
  };

  const menuItems = (
    <>
      {/*................ home dropdown menu start.............*/}
      <li
        className={`py-3 text-white hover:bg-white duration-700 hover:text-black ${
          location.pathname === "/" ? "border-b-2 border-primary" : ""
        }`}
      >
        <Link to="/" className="font-bold">
          <div className="flex group cursor-pointer items-center  ">
            <span>{isBangla ? "হোম" : "Home"}</span>
          </div>
        </Link>
      </li>
      {/* ......................contact dropdown ............ */}
      <li
        className={`py-3 hover:bg-white duration-700  text-white hover:text-black font-bold ${
          location.pathname === "/contack" ? "border-b-2 border-primary" : ""
        }`}
      >
        <Link
          to="/contact"
          className="flex group cursor-pointer items-center py-4 "
        >
          <span>{isBangla ? "যোগাযোগ করুন" : "Contact Us"}</span>
        </Link>
      </li>
    </>
  );

  const account = (
    <>
      {/*................ Account dropdown menu start ................*/}
      <li
        className="font-bold py-3 px-5 cursor-pointer text-white hover:bg-white hover:text-black duration-700 relative"
        onMouseEnter={toggleAccountDropdown}
        onMouseLeave={accountDropdownClose}
      >
        <div
          className="flex group cursor-pointer items-center"
          onClick={toggleAccountDropdown}
        >
          <span onClick={() => setAccountDropdownOpen(false)}>
            <Icon icon="gg:profile" width={32} className="mx-auto" />
          </span>
          <Icon
            icon="iconamoon:arrow-down-2-bold"
            className="group-hover:translate-y-1 duration-300"
            width="25"
          />
        </div>

        {accountDropdownOpen && (
          <ul
            className={`dropdown-menu border-t-2 border-primary py-4 absolute right-0 left-auto mt-3 w-48 z-50 shadow-lg duration-300 ease-in-out divide-y-2 ${
              darkMode ? "bg-gradient-backdrop" : "bg-white"
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            <Account setAccountDropdownOpen={setAccountDropdownOpen} />
          </ul>
        )}
      </li>
    </>
  );

  return (
    <>
      <div
        className={`fixed top-0 z-50 w-full transition duration-500 px-5 ${
          scrolled
            ? `bg-primary dropdown-menu shadow-lg ${
                darkMode ? "bg-gradient-backdrop" : ""
              }`
            : "bg-primary shadow-lg"
        } `}
      >
        <div className="relative flex items-center justify-between">
          <Link
            to="/"
            aria-label="Company"
            title="Company"
            className="inline-flex items-center"
          >
            <img src={colorLogo1} alt="" className="w-40 py-1" />
          </Link>
          <ul className="items-center nav-list hidden space-x-8 lg:flex">
            {menuItems}
          </ul>
          <ul className=" items-center hidden lg:flex">{account}</ul>
        </div>
      </div>

      <div className="fixed z-50 w-full transition py-3 duration-500 lg:hidden pr-5">
        <div className="flex justify-end relative">
          <button
            className="w-10 h-6 absolute top-2 right-2 z-10 flex flex-col justify-between"
            onClick={toggleMenu}
          >
            {scrolled ? (
              // span one
              <span
                className={`h-1 w-4/5 bg-brand rounded-2xl ${
                  isMenuOpen
                    ? "rotate-45 translate-y-2.5 duration-300"
                    : "translate-y-0 duration-300"
                }`}
              ></span>
            ) : (
              <span
                className={`h-1 w-4/5 bg-white rounded-2xl ${
                  isMenuOpen
                    ? "rotate-45 translate-y-2.5 duration-300"
                    : "translate-y-0 duration-300"
                }`}
              ></span>
            )}

            {/* span two */}
            {scrolled ? (
              <span
                className={`h-1 w-4/5 bg-brand rounded-2xl ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              ></span>
            ) : (
              <span
                className={`h-1 w-4/5 bg-white rounded-2xl ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              ></span>
            )}

            {/* span three */}
            {scrolled ? (
              <span
                className={`h-1 w-4/5 bg-brand rounded-2xl ${
                  isMenuOpen
                    ? "-rotate-45 -translate-y-2.5 duration-300"
                    : "translate-y-0 duration-300"
                }`}
              ></span>
            ) : (
              <span
                className={`h-1 w-4/5 bg-white rounded-2xl ${
                  isMenuOpen
                    ? "-rotate-45 -translate-y-2.5 duration-300"
                    : "translate-y-0 duration-300 bg-brand"
                }`}
              ></span>
            )}
          </button>
        </div>
        {isMenuOpen && (
          <div
            className={`absolute top-5 left-0 w-full pb-10 bg-secondary mt-11  overflow-y-auto  mr-3 ${
              isMenuOpen
                ? "dropdown-menu-small"
                : "-translate-x-full duration-300"
            } ${darkMode ? "bg-gradient-backdrop text-white" : ""}`}
          >
            <div className=" shadow-sm text-brand hover:text-primary">
              <nav className="">
                <ul className="space-y-4 px-4">{menuItems}</ul>
                <ul className=" items-center hidden lg:flex">{account}</ul>
              </nav>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default Navbar;
