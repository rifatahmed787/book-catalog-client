import BannerSwiper from "@/components/Home/BannerSwiper";
import LatestBooks from "@/components/Home/LatestBooks";

const Home = () => {
  return (
    <div>
      <BannerSwiper />
      <div className="bg-white pt-[210px]  md:pt-[283px] pb-[100px] -mt-[190px]">
        <LatestBooks />
      </div>
      <div></div>
    </div>
  );
};

export default Home;
