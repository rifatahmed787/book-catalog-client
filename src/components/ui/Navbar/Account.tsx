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
      <li className="">
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
            className={`text-lg font-bold text-center my-2 ${
              darkMode ? "text-white" : "text-gray-700"
            }`}
          >
            {" "}
            {user?.name?.firstName} {user?.name?.lastName}
          </h2>
          <Link to="" className="flex justify-center mb-2">
            <BrandButton text="View Profile" />
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
              className={`px-4 py-2 mt-2 text-base w-full text-left text-gray-700  flex items-center gap-2 ${
                darkMode ? "text-white" : "hover:bg-gray-100"
              }`}
              onClick={() => setAccountDropdownOpen(false)}
            >
              <Icon icon="material-symbols:dashboard-outline" width={25} />
              Dashboard
            </a>
          </li>

          {/* shop */}
          <li>
            <a
              href="#"
              className={`px-4 py-2 mt-2 text-base w-full text-left text-gray-700  flex items-center gap-2 ${
                darkMode ? "text-white" : "hover:bg-gray-100"
              }`}
            >
              <Icon icon="tdesign:shop" width={25} />
              Shop
            </a>
          </li>

          {/* wishlist */}
          <li>
            <a
              href="#"
              className={`px-4 py-2 mt-2 text-base w-full text-left text-gray-700  flex items-center gap-2 ${
                darkMode ? "text-white" : "hover:bg-gray-100"
              }`}
            >
              <Icon
                icon="streamline:interface-favorite-heart-reward-social-rating-media-heart-it-like-favorite-love"
                width={25}
              />
              WishList
            </a>
          </li>

          {/* checkout */}
          <li>
            <a
              href="#"
              className={`px-4 py-2 mt-2 text-base w-full text-left text-gray-700  flex items-center gap-2 ${
                darkMode ? "text-white" : "hover:bg-gray-100"
              }`}
            >
              <Icon icon="material-symbols:shopping-cart-checkout" width={25} />
              CheckOut
            </a>
          </li>

          {/* settings */}
          <li>
            <a
              href="#"
              className={`px-4 py-2 mt-2 text-base w-full text-left text-gray-700  flex items-center gap-2 ${
                darkMode ? "text-white" : "hover:bg-gray-100"
              }`}
            >
              <Icon icon="clarity:settings-line" width={25} />
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
                darkMode ? "text-white" : "hover:bg-gray-100 "
              }`}
            >
              <Icon icon="material-symbols:language" width={25} />
              {isBangla ? "বাংলা" : "English"}
            </h1>
          </div>
        </label>

        {/* darkmode toggle button */}
        <ToggleButton />
        <button
          onClick={handleLogout}
          className={`px-4 py-2 mt-2 text-base w-full text-left text-gray-700    flex items-center gap-2 ${
            darkMode ? "text-white" : "hover:bg-gray-100"
          }`}
        >
          <Icon icon="humbleicons:logout" width={25} />
          Log out
        </button>
      </li>
    </>
  );
};

export default Account;
