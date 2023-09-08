import { DarkModeContext } from "@/components/DarkModeContext/DarkModeContext";
import BannerSwiper from "@/components/Home/BannerSwiper";
import ClientReview from "@/components/Home/ClientReview";
import LatestBooks from "@/components/Home/LatestBooks";
import { useContext } from "react";

const Home = () => {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <div>
      <BannerSwiper />
      <div
        className={` pt-[210px]  md:pt-[283px] pb-[100px] -mt-[190px] ${
          darkMode ? "bg-black" : "bg-white"
        }`}
      >
        <LatestBooks />
        <ClientReview />
      </div>
    </div>
  );
};

export default Home;
