/* eslint-disable @typescript-eslint/no-misused-promises */

import { useContext } from "react";

import { Icon } from "@iconify/react";
import "./Navbar.css";

import { DarkModeContext } from "@/components/DarkModeContext/DarkModeContext";
import ToggleButton from "@/components/ToggleButton/ToggleButton";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { useCookies } from "react-cookie";
import { userLoggedOut } from "@/redux/features/auth/authSlice";
import { Link } from "react-router-dom";
import BrandButton from "@/components/BrandButton/BrandButton";

type AccountProps = {
  setAccountDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Account: React.FC<AccountProps> = ({ setAccountDropdownOpen }) => {
  const { darkMode, isBangla, toggoleBangla } = useContext(DarkModeContext);

  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  /* eslint-disable @typescript-eslint/no-unused-vars */
  const [_cookies, _setCookie, removeCookie] = useCookies(["auth_details"]);

  // handle logout
  const handleLogout = () => {
    dispatch(userLoggedOut());
    // dispatch(apiSlice.util.invalidateTags(["courseVideos"]));
    removeCookie("auth_details", { path: "/" });
  };

  return (
    <>
      <li className="overflow-y-auto">
        {/* user profile */}
        <div
          className={`relative after:absolute after:content-normal after:w-full after:h-0.5  ${
            darkMode ? "after:bg-white" : "after:bg-primary"
          }`}
        >
          <img
            src={user?.imageUrl}
            alt=""
            className="w-16 h-16 rounded-full mx-auto"
          />

          <h2
            className={`text-lg font-bold text-center my-1 ${
              darkMode ? "text-white" : "text-gray-700"
            }`}
          >
            {" "}
            {user?.name?.firstName} {user?.name?.lastName}
          </h2>
          <Link to="" className="flex justify-center mb-2">
            <BrandButton text="View Profile" icon="" />
          </Link>
        </div>
        <ul
          className="py-2 text-base text-gray-700"
          aria-labelledby="dropdownUserAvatarButton"
        >
          {/* dashboard */}
          <li>
            <a
              href="#"
              className={`px-4 py-2 text-base w-full text-left text-gray-700  flex items-center gap-2 ${
                darkMode
                  ? "text-white hover:text-white hover:bg-gray-800"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => setAccountDropdownOpen(false)}
            >
              <Icon icon="material-symbols:dashboard-outline" width={20} />
              Dashboard
            </a>
          </li>

          {/* shop */}
          <li>
            <Link
              to="/cart"
              className={`px-4 py-2 text-base w-full text-left text-gray-700  flex items-center gap-2 ${
                darkMode
                  ? "text-white hover:text-white hover:bg-gray-800"
                  : "hover:bg-gray-100"
              }`}
            >
              <Icon icon="tdesign:shop" width={20} />
              Shop
            </Link>
          </li>

          {/* checkout */}
          <li>
            <Link
              to="/checkout"
              className={`px-4 py-2 text-base w-full text-left text-gray-700  flex items-center gap-2 ${
                darkMode
                  ? "text-white hover:text-white hover:bg-gray-800"
                  : "hover:bg-gray-100"
              }`}
            >
              <Icon icon="material-symbols:shopping-cart-checkout" width={20} />
              CheckOut
            </Link>
          </li>

          {/* wishlist */}
          <li>
            <Link
              to="/wishlist"
              className={`px-4 py-2 text-base w-full text-left text-gray-700  flex items-center gap-2 ${
                darkMode
                  ? "text-white hover:text-white hover:bg-gray-800"
                  : "hover:bg-gray-100"
              }`}
            >
              <Icon
                icon="streamline:interface-favorite-heart-reward-social-rating-media-heart-it-like-favorite-love"
                width={20}
              />
              WishList
            </Link>
          </li>

          {/* reading list */}
          <li>
            <Link
              to="/reading-list"
              className={`px-4 py-2 text-base w-full text-left text-gray-700  flex items-center gap-2 ${
                darkMode
                  ? "text-white hover:text-white hover:bg-gray-800"
                  : "hover:bg-gray-100"
              }`}
            >
              <Icon icon="fluent-mdl2:reading-mode" width={18} />
              Reading List
            </Link>
          </li>

          {/* settings */}
          <li>
            <a
              href="#"
              className={`px-4 py-2 text-base w-full text-left text-gray-700  flex items-center gap-2 ${
                darkMode
                  ? "text-white hover:text-white hover:bg-gray-800"
                  : "hover:bg-gray-100"
              }`}
            >
              <Icon icon="clarity:settings-line" width={20} />
              Settings
            </a>
          </li>
        </ul>

        {/* Language change button  */}

        <label className="cursor-pointer">
          <div className="relative">
            <input
              type="checkbox"
              className="sr-only"
              checked={darkMode}
              onChange={toggoleBangla}
            />
            <h1
              className={`px-4 py-2 text-base w-full text-left text-gray-700 flex items-center gap-2 ${
                darkMode
                  ? "text-white hover:text-white hover:bg-gray-800"
                  : "hover:bg-gray-100 "
              }`}
            >
              <Icon icon="material-symbols:language" width={20} />
              {isBangla ? "বাংলা" : "English"}
            </h1>
          </div>
        </label>

        {/* darkmode toggle button */}
        <ToggleButton />
        <button
          onClick={handleLogout}
          className={`px-4 py-2 text-base w-full text-left text-gray-700 flex items-center gap-2 ${
            darkMode ? "text-white hover:bg-gray-800" : "hover:bg-gray-100"
          }`}
        >
          <Icon icon="humbleicons:logout" width={20} />
          Log out
        </button>
      </li>
    </>
  );
};

export default Account;
