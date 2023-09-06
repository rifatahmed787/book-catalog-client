import { DarkModeContext } from "@/components/DarkModeContext/DarkModeContext";
import { Icon } from "@iconify/react"; // icon
import { useContext } from "react";

const TopNav = () => {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <div
      className={`md:block hidden bg-secondary text-white h-8  px-5 ${
        darkMode ? "bg-black text-white" : ""
      }`}
    >
      <div className="top-nav flex overflow-hidden items-center justify-between pt-1">
        {/* Left Side: Text Animation */}
        <div>
          <div className="top-nav-text">Welcome to Book Catalog</div>
          <div className="top-nav-text">
            <span className="pl-2">24/7 hours open</span>
          </div>
        </div>

        {/* Right Side: Social icon & Location */}
        <div className="flex gap-3">
          <div>
            <div className="top-nav-text">Gmail:</div>
            <div className="top-nav-text">
              <span className="pl-2">mdrifatahmed787@gmail.com</span>
            </div>
          </div>
          <a href="/">
            <Icon
              width={22}
              className="hover:cursor-pointer hover:skew-y-4 duration-300"
              icon="mdi:location"
            />
          </a>
          <a href="/">
            <Icon
              width={22}
              className="hover:cursor-pointer hover:skew-y-4 duration-300 text-white"
              icon="mdi:twitter"
            />
          </a>
          <a href="/">
            <Icon
              width={22}
              className="hover:cursor-pointer hover:skew-y-4 duration-300"
              icon="ic:baseline-facebook"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
