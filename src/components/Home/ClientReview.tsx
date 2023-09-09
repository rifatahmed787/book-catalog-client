import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Icon } from "@iconify/react";
import profile from "../../assets/banner/banner1.jpg";
import view from "../../assets/banner/home.jpg";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { useContext, useRef } from "react";
import { DarkModeContext } from "../DarkModeContext/DarkModeContext";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

type Swiper = {
  swiper: Swiper | null;
};
const ClientReview = () => {
  const swiperRef = useRef<SwiperRef>(null);
  const { darkMode } = useContext(DarkModeContext);

  const handleMouseEnter = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.autoplay.stop();
    }
  };

  const handleMouseLeave = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.autoplay.start();
    }
  };
  return (
    <div className="hidden md:block">
      <div
        className={` mx-5 px-20 pb-10 my-16 grid md:grid-cols-2 gap-10 justify-items-center items-center  bg-white shadow-lg ${
          darkMode ? "bg-gradient-backdrop rounded-md" : ""
        }`}
      >
        <div className="relative inline-flex justify-center items-center group">
          <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-primary group-hover:w-full group-hover:h-full opacity-25"></span>
          <span className="absolute inset-0 w-full h-full -mt-1 cursor-pointer"></span>
          <img src={view} alt="" className="md:w-full w-11/12 bg-cover" />
        </div>
        <div
          className="max-w-lg"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          id="client"
        >
          <div>
            <h1
              className="text-primary text-center font-anton text-3xl md:text-5xl  font-normal leading-[70px] md:leading-[140px] letter-spacing 
            tracking-[-2.82px]"
            >
              What People Say
            </h1>
          </div>

          {/* testimonial carousel */}
          <div className="relative">
            {/* carousel part */}
            <>
              <Swiper
                loop={true}
                modules={[Autoplay, Navigation, Pagination]}
                className="mySwiper"
              >
                {/* quote icon */}
                <Icon
                  icon="fa-solid:quote-left"
                  className={`absolute -left-10 top-0  ${
                    darkMode ? "text-gray-500" : "opacity-20"
                  }`}
                  width={70}
                />
                <SwiperSlide className=" text-center overflow-hidden">
                  {" "}
                  <article
                    className={`font-normal italic  text-[18px] font-sans text-center pt-1 ${
                      darkMode ? "text-white" : "text-[#000]"
                    }`}
                  >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptatibus laborum quas corrupti culpa vero et, cum
                    voluptatem veniam, aliquid quia, architecto accusantium?
                    Fugit veniam nostrum libero maiores, voluptatem,
                  </article>
                  <img
                    src={profile}
                    alt=""
                    className="w-20 h-20 rounded-full mx-auto mt-7"
                  />
                  <p className="text-2xl text-primary font-display1 font-bold pt-5">
                    Md Rifat
                  </p>
                </SwiperSlide>
                <SwiperSlide className=" text-center overflow-hidden">
                  {" "}
                  <article className=" font-normal italic text-[#000] text-[18px] font-sans text-center pt-1">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptatibus laborum quas corrupti culpa vero et, cum
                    voluptatem veniam, aliquid quia, architecto accusantium?
                    Fugit veniam nostrum libero maiores, voluptatem,
                  </article>
                  <img
                    src={profile}
                    alt=""
                    className="w-20 h-20 rounded-full mx-auto mt-7"
                  />
                  <p className="text-2xl text-primary font-display1 font-bold pt-5">
                    Md Imran
                  </p>
                </SwiperSlide>
                <SwiperSlide className=" text-center overflow-hidden">
                  {" "}
                  <article className=" font-normal italic text-[#000] text-[18px] font-sans text-center pt-1">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptatibus laborum quas corrupti culpa vero et, cum
                    voluptatem veniam, aliquid quia, architecto accusantium?
                    Fugit veniam nostrum libero maiores, voluptatem,
                  </article>
                  <img
                    src={profile}
                    alt=""
                    className="w-20 h-20 rounded-full mx-auto mt-7"
                  />
                  <p className="text-2xl text-primary font-display1 font-bold pt-5">
                    Md Hanif
                  </p>
                </SwiperSlide>
                <SwiperSlide className=" text-center overflow-hidden">
                  {" "}
                  <article className=" font-normal italic text-[#000] text-[18px] font-sans text-center pt-1">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptatibus laborum quas corrupti culpa vero et, cum
                    voluptatem veniam, aliquid quia, architecto accusantium?
                    Fugit veniam nostrum libero maiores, voluptatem,
                  </article>
                  <img
                    src={profile}
                    alt=""
                    className="w-20 h-20 rounded-full mx-auto mt-7"
                  />
                  <p className="text-2xl text-primary font-display1 font-bold pt-5">
                    Md Habib
                  </p>
                </SwiperSlide>
                {/* quote icon */}
                <Icon
                  icon="fa-solid:quote-right"
                  className={`absolute -right-10 top-0  ${
                    darkMode ? "text-gray-500" : "opacity-20"
                  }`}
                  width={70}
                />
              </Swiper>
            </>
          </div>

          {/* partnar carousel  */}
        </div>
      </div>
    </div>
  );
};

export default ClientReview;
