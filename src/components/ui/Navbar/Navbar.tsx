import { SetStateAction, useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import colorLogo1 from "../../../assets/logo/logo.svg";
import { Icon } from "@iconify/react";
import "./Navbar.css";
import { DarkModeContext } from "@/components/DarkModeContext/DarkModeContext";
import Account from "./Account";
import { useAppSelector } from "@/hooks/reduxHook";
import WhiteButton from "@/components/BrandButton/WhiteButton";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const { darkMode, isBangla } = useContext(DarkModeContext);
  const { user, isLoggedIn } = useAppSelector((state) => state.auth);

  const [activeMenu, setActiveMenu] = useState(location.pathname);

  const handleMenuClick = (route: SetStateAction<string>) => {
    setActiveMenu(route);
  };

  //navbar color change effect
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 50) {
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
    <div className="flex flex-col md:flex-row  items-center md:space-x-5">
      {/*................ home dropdown menu start.............*/}
      <Link to="/" className="font-bold text-white">
        <li
          onClick={() => handleMenuClick("/")}
          className={`menu-item py-3 md:py-5 px-3 ${
            activeMenu === "/" ? "active" : ""
          }`}
        >
          <div className="flex group cursor-pointer items-center py-1">
            <span>{isBangla ? "হোম" : "Home"}</span>
          </div>
        </li>
      </Link>

      {/* ......................books ............ */}
      <Link to="/books" className="font-bold text-white">
        <li
          onClick={() => handleMenuClick("/books")}
          className={`menu-item py-3 md:py-5 px-3 ${
            activeMenu === "/books" ? "active" : ""
          }`}
        >
          <div className="flex group cursor-pointer items-center py-1">
            <span>{isBangla ? "বইসমূহ" : "Books"}</span>
          </div>
        </li>
      </Link>
      {/* ......................contact dropdown ............ */}
      <Link to="/contact" className="font-bold text-white">
        <li
          onClick={() => handleMenuClick("/contact")}
          className={`menu-item py-3 md:py-5 px-3 ${
            activeMenu === "/contact" ? "active" : ""
          }`}
        >
          <div className="flex group cursor-pointer items-center py-1">
            <span>{isBangla ? "যোগাযোগ করুন" : "Contact Us"}</span>
          </div>
        </li>
      </Link>
    </div>
  );

  // account menu
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
            <img
              src={user?.imageUrl}
              alt=""
              className="w-10 h-10 rounded-full mx-auto"
            />
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
        className={`bg-primary shadow-lg top-0 z-40 w-full transition duration-500 px-5 ${
          darkMode ? "bg-gradient-backdrop" : ""
        } ${scrolled ? "dropdown-menu fixed" : "droptop-menu sticky"} `}
      >
        <div className="relative flex items-center justify-between">
          <Link
            to="/"
            aria-label="Company"
            title="Company"
            className="inline-flex items-center"
          >
            <img src={colorLogo1} alt="" className="w-40" />
          </Link>
          <ul className="items-center nav-list hidden space-x-8 lg:flex">
            {menuItems}
          </ul>
          {isLoggedIn ? (
            <>
              <ul className=" items-center hidden lg:flex">{account}</ul>
            </>
          ) : (
            <Link to="/auth/signup" className="hidden md:block">
              <WhiteButton text="Signup Now" />
            </Link>
          )}
        </div>
      </div>

      <div className="fixed z-50 w-full transition  duration-500 lg:hidden pr-3 top-5">
        <div className="flex justify-end relative">
          <button
            className="w-10 h-6 absolute top-0 z-50 flex flex-col justify-between"
            onClick={toggleMenu}
          >
            {scrolled ? (
              // span one
              <span
                className={`h-1 w-4/5 bg-white rounded-2xl ${
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
                className={`h-1 w-4/5 bg-white rounded-2xl ${
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
                className={`h-1 w-4/5 bg-white rounded-2xl ${
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
            className={`absolute  left-0 w-full bg-primary mt-2 top-10 overflow-y-auto ${
              isMenuOpen
                ? "dropdown-menu-small"
                : "-translate-x-full duration-300"
            } ${darkMode ? "bg-gradient-backdrop text-white" : ""}`}
          >
            <div className=" shadow-sm text-brand hover:text-primary">
              <nav className="flex justify-between mx-5">
                <ul className="space-y-4 px-4">{menuItems}</ul>
                {isLoggedIn ? (
                  <>
                    <ul className=" items-center hidden lg:flex">{account}</ul>
                  </>
                ) : (
                  <Link to="/auth/signup" className="mt-2">
                    <WhiteButton text="Signup Now" />
                  </Link>
                )}
              </nav>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default Navbar;
