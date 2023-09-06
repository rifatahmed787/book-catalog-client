import { DarkModeContext } from "@/components/DarkModeContext/DarkModeContext";
import BannerSwiper from "@/components/Home/BannerSwiper";
import LatestBooks from "@/components/Home/LatestBooks";
import { useContext } from "react";

const Home = () => {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <div>
      <BannerSwiper />
      <div
        className={`bg-white pt-[210px]  md:pt-[283px] pb-[100px] -mt-[190px] ${
          darkMode ? "bg-black" : ""
        }`}
      >
        <LatestBooks />
      </div>
      <div></div>
    </div>
  );
};

export default Home;
