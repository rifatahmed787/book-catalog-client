import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SwiperCore, {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from "swiper";
import banner1 from "../../assets/banner/banner1.jpg";
import banner2 from "../../assets/banner/banner2.jpg";
import banner3 from "../../assets/banner/banner3.jpg";

// Import Swiper modules
SwiperCore.use([Autoplay, EffectFade, Navigation, Pagination]);

const BannerSwiper = () => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const textRef = useRef(null);

  const handleSlideChange = (swiper: { activeIndex: any }) => {
    const currentIndex = swiper.activeIndex;
    setActiveSlideIndex(currentIndex);

    if (textRef.current) {
      textRef.current.classList.add("banner-zoom");
    }
  };

  const handleTransitionEnd = () => {
    if (textRef.current) {
      textRef.current.classList.remove("banner-zoom");
    }
  };

  return (
    <>
      <Swiper
        spaceBetween={30}
        effect="fade"
        navigation
        autoplay={{ delay: 5500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        onSlideChange={handleSlideChange}
        onTransitionEnd={handleTransitionEnd}
        className="mySwiper"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="bg-white">
            <div className="bannerBG-1 md:h-[75vh] h-screen flex items-end">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Left Side: Text Area */}
                <div className="flex py-10 items-center justify-center md:justify-start px-10 md:px-20">
                  <div>
                    <h3
                      ref={textRef}
                      className={`text-white font-light text-xl md:text-2xl text-center md:text-start ${
                        activeSlideIndex === 0 ? "banner-zoom" : ""
                      }`}
                    >
                      Welcome to Werro Dental Clinic
                    </h3>
                    <h1
                      ref={textRef}
                      className={`text-2xl md:text-6xl text-center md:text-start font-bold bg-third text-white p-3 md:p-5 my-3 md:my-5 md:w-3/4 ${
                        activeSlideIndex === 0 ? "banner-zoom" : ""
                      }`}
                    >
                      Let's Perfect Smile
                    </h1>
                    <h1
                      ref={textRef}
                      className={`text-2xl md:text-6xl text-center md:text-start font-bold bg-third text-white p-3 md:p-5 my-3 md:my-5 ${
                        activeSlideIndex === 0 ? "banner-zoom" : ""
                      }`}
                    >
                      Caring with your teeth
                    </h1>

                    <article
                      ref={textRef}
                      className={`md:text-white text-black text-base text-center md:text-start md:text-xl font-extralight ${
                        activeSlideIndex === 0 ? "banner-zoom" : ""
                      }`}
                    >
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Vero aspernatur voluptates pariatur assumenda voluptatem
                      ducimus debitis minima quo deserunt ipsum!
                    </article>
                    {/* Button: Booking Now & Details More */}
                    <div className="my-5 flex justify-center md:justify-start">
                      <div
                        data-aos="fade-up"
                        data-aos-anchor-placement="bottom-bottom"
                      >
                        <Link to="#">
                          <button className="bg-secondary text-white md:text-xl hover:skew-y-6 duration-300 px-3 py-2 mr-5 rounded-full">
                            Booking Now
                          </button>
                        </Link>
                      </div>
                      <div
                        data-aos="fade-up"
                        data-aos-anchor-placement="bottom-bottom"
                      >
                        <Link to="#">
                          <button className="bg-white text-secondary font-bold md:text-xl hover:skew-y-6 duration-300 px-3 py-2 rounded-full">
                            Details More
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Right side: Banner Slider Image */}
                <div>
                  <img src={banner1} alt="banner photo" className="w-full" />
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="bg-white">
            <div className="bannerBG-2 md:h-[75vh] h-screen flex items-end">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Left side: Banner Slider Image */}
                <div className="md:mt-14 order-2 md:order-1">
                  <img src={banner2} alt="banner photo" className="w-full" />
                </div>
                {/* Right Side: Text Area */}
                <div className="flex order-1 md:order-2 py-10 items-center justify-center md:justify-end px-10 md:px-20">
                  <div className="md:pl-10">
                    <h3
                      ref={textRef}
                      className={`text-white font-light text-xl md:text-2xl text-center md:text-start ${
                        activeSlideIndex === 1 ? "banner-zoom" : ""
                      }`}
                    >
                      Welcome to Werro Dental Clinic
                    </h3>
                    <h1
                      ref={textRef}
                      className={`text-2xl md:text-6xl text-center md:text-start font-bold bg-third text-white p-3 md:p-5 my-3 md:my-5 md:w-3/4 ${
                        activeSlideIndex === 1 ? "banner-zoom" : ""
                      }`}
                    >
                      Let's Perfect Smile
                    </h1>
                    <h1
                      ref={textRef}
                      className={`text-2xl md:text-6xl text-center md:text-start font-bold bg-third text-white p-3 md:p-5 my-3 md:my-5 ${
                        activeSlideIndex === 1 ? "banner-zoom" : ""
                      }`}
                    >
                      Caring with your teeth
                    </h1>

                    <article
                      ref={textRef}
                      className={`md:text-white text-black text-base text-center md:text-start md:text-xl font-extralight ${
                        activeSlideIndex === 1 ? "banner-zoom" : ""
                      }`}
                    >
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Vero aspernatur voluptates pariatur assumenda voluptatem
                      ducimus debitis minima quo deserunt ipsum!
                    </article>
                    {/* Button: Booking Now & Details More */}
                    <div className="my-5 flex justify-center md:justify-start">
                      <div
                        data-aos="fade-up"
                        data-aos-anchor-placement="bottom-bottom"
                      >
                        <Link to="#">
                          <button className="bg-secondary text-white md:text-xl hover:skew-y-6 duration-300 px-3 py-2 mr-5 rounded-full">
                            Booking Now
                          </button>
                        </Link>
                      </div>
                      <div
                        data-aos="fade-up"
                        data-aos-anchor-placement="bottom-bottom"
                      >
                        <Link to="#">
                          <button className="bg-white text-secondary font-bold md:text-xl hover:skew-y-6 duration-300 px-3 py-2 rounded-full">
                            Details More
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div className="bg-white">
            <div className="bannerBG-1 md:h-[75vh] h-screen flex items-end">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Left Side: Text Area */}
                <div className="flex py-10 items-center justify-center md:justify-start px-10 md:px-20">
                  <div>
                    <h3
                      ref={textRef}
                      className={`text-white font-light text-xl md:text-2xl text-center md:text-start ${
                        activeSlideIndex === 2 ? "banner-zoom" : ""
                      }`}
                    >
                      Welcome to Werro Dental Clinic
                    </h3>
                    <h1
                      ref={textRef}
                      className={`text-2xl md:text-6xl text-center md:text-start font-bold bg-third text-white p-3 md:p-5 my-3 md:my-5 md:w-3/4 ${
                        activeSlideIndex === 2 ? "banner-zoom" : ""
                      }`}
                    >
                      Let's Perfect Smile
                    </h1>
                    <h1
                      ref={textRef}
                      className={`text-2xl md:text-6xl text-center md:text-start font-bold bg-third text-white p-3 md:p-5 my-3 md:my-5 ${
                        activeSlideIndex === 2 ? "banner-zoom" : ""
                      }`}
                    >
                      Caring with your teeth
                    </h1>

                    <article
                      ref={textRef}
                      className={`md:text-white text-black text-base text-center md:text-start md:text-xl font-extralight ${
                        activeSlideIndex === 2 ? "banner-zoom" : ""
                      }`}
                    >
                      LHEllo Akashd
                    </article>
                    {/* Button: Booking Now & Details More */}
                    <div className="my-5 flex justify-center md:justify-start">
                      <div
                        data-aos="fade-up"
                        data-aos-anchor-placement="bottom-bottom"
                      >
                        <Link to="#">
                          <button className="bg-secondary text-white md:text-xl hover:skew-y-6 duration-300 px-3 py-2 mr-5 rounded-full">
                            Booking Now
                          </button>
                        </Link>
                      </div>
                      <div
                        data-aos="fade-up"
                        data-aos-anchor-placement="bottom-bottom"
                      >
                        <Link to="#">
                          <button className="bg-white text-secondary font-bold md:text-xl hover:skew-y-6 duration-300 px-3 py-2 rounded-full">
                            Details More
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Right side: Banner Slider Image */}
                <div>
                  <img src={banner3} alt="banner photo" className="w-full" />
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default BannerSwiper;
