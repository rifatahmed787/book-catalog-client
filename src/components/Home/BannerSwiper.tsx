import BrandButton from "../BrandButton/BrandButton";
import WhiteButton from "../BrandButton/WhiteButton";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules

import { useContext, useRef, useState } from "react";

import { Autoplay, Navigation, EffectFade } from "swiper/modules";
import { Icon } from "@iconify/react";
import { DarkModeContext } from "../DarkModeContext/DarkModeContext";
import { Link } from "react-router-dom";

type Swiper = {
  swiper: Swiper | null;

  slidePrev: () => void;
  slideNext: () => void;
};

type SwiperRef = {
  swiper?: Swiper;
};

const BannerSwiper = () => {
  const { darkMode } = useContext(DarkModeContext);
  const swiperRef = useRef<SwiperRef>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  // Function to slide to the previous slide
  const goPrevButton = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  // Function to slide to the next slide
  const goNextButton = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const handleSlideChange = (swiper: { activeIndex: any }) => {
    const currentIndex = swiper.activeIndex;
    setActiveSlideIndex(currentIndex);

    if (textRef.current) {
      textRef.current.classList.add("banner-zoom");
    }
  };

  return (
    <>
      <Swiper
        spaceBetween={30}
        loop={true}
        effect={"fade"}
        navigation={{
          prevEl: ".prev-button-1",
          nextEl: ".next-button-1",
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, EffectFade, Navigation]}
        className={`mySwiper max-h-screen relative group ${
          darkMode ? "bg-gradient-backdrop" : ""
        }`}
        onSlideChange={handleSlideChange}
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="bannerBG-1 h-[60vh] md:h-[75vh] flex items-end relative after:absolute after:content-normal after:bg-black after:opacity-50 after:h-full after:w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 z-10">
              {/* Left Side: Text Area */}
              <div className="flex py-10 items-center justify-center md:justify-start px-10 md:px-20">
                <div>
                  <h1
                    ref={textRef}
                    className={`text-2xl md:text-4xl text-center  font-bold bg-third text-white p-3 md:px-5 mb-3  ${
                      activeSlideIndex === 0 ? "banner-zoom" : ""
                    }`}
                  >
                    Today a <span className="text-primary">reader, </span>
                    tomorrow a <span className="text-primary">leader.</span>
                  </h1>

                  <article
                    ref={textRef}
                    className={`text-white md:p-5 text-base text-center md:text-xl font-extralight ${
                      activeSlideIndex === 0 ? "banner-zoom" : ""
                    }`}
                  >
                    “The more that you read, the more things you will know. The
                    more that you learn, the more places you'll go.” “Books are
                    a uniquely portable magic.” “I kept always two books in my
                    pocket, one to read, one to write in.”
                  </article>
                  {/* Button: Booking Now & Details More */}
                  <div className="my-3 md:px-5 flex justify-center items-center gap-5 ">
                    <div>
                      <Link to="/">
                        <BrandButton
                          text="Buy Now"
                          icon={<Icon icon="ic:baseline-greater-than" />}
                        />
                      </Link>
                    </div>
                    <div>
                      <Link to="/">
                        <WhiteButton text="Read Now ⇾" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div></div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}

        <SwiperSlide>
          <div className="bannerBG-2 h-[60vh] md:h-[75vh] flex items-end relative after:absolute after:content-normal after:bg-black after:opacity-50 after:h-full after:w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 z-10">
              <div></div>
              {/* Right Side: Text Area */}
              <div className="flex order-1 md:order-2 py-10 items-center justify-center  px-10 md:px-20">
                <div className="md:pl-10">
                  <h1
                    ref={textRef}
                    className={`text-2xl md:text-4xl text-center  font-bold bg-third text-white p-3 md:px-5 mb-3  ${
                      activeSlideIndex === 0 ? "banner-zoom" : ""
                    }`}
                  >
                    A reader lives a{" "}
                    <span className="text-primary">thousand </span>
                    lives before he <span className="text-primary">dies.</span>
                  </h1>

                  <article
                    ref={textRef}
                    className={`text-white md:p-5 text-base text-center md:text-xl font-extralight ${
                      activeSlideIndex === 0 ? "banner-zoom" : ""
                    }`}
                  >
                    “The more that you read, the more things you will know. The
                    more that you learn, the more places you'll go.” “Books are
                    a uniquely portable magic.” “I kept always two books in my
                    pocket, one to read, one to write in.”
                  </article>
                  {/* Button: Booking Now & Details More */}
                  <div className="my-3 md:px-5 flex justify-center items-center gap-5 md:justify-center">
                    <div>
                      <Link to="/">
                        <BrandButton
                          text="Buy Now"
                          icon={<Icon icon="ic:baseline-greater-than" />}
                        />
                      </Link>
                    </div>
                    <div>
                      <Link to="/">
                        <WhiteButton text="Read Now ⇾" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div className="bannerBG-3 h-[60vh] md:h-[75vh] flex items-end relative after:absolute after:content-normal after:bg-black after:opacity-50 after:h-full after:w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 z-10">
              {/* Left Side: Text Area */}
              <div className="flex py-10 items-center justify-center md:justify-start px-10 md:px-20">
                <div>
                  <h1
                    ref={textRef}
                    className={`text-2xl md:text-4xl text-center  font-bold bg-third text-white p-3 md:px-5 mb-3  ${
                      activeSlideIndex === 0 ? "banner-zoom" : ""
                    }`}
                  >
                    Today a <span className="text-primary">reader, </span>
                    tomorrow a <span className="text-primary">leader.</span>
                  </h1>

                  <article
                    ref={textRef}
                    className={`text-white md:p-5 text-base text-center md:text-xl font-extralight ${
                      activeSlideIndex === 0 ? "banner-zoom" : ""
                    }`}
                  >
                    “The more that you read, the more things you will know. The
                    more that you learn, the more places you'll go.” “Books are
                    a uniquely portable magic.” “I kept always two books in my
                    pocket, one to read, one to write in.”
                  </article>
                  {/* Button: Booking Now & Details More */}
                  <div className="my-3 md:px-5 flex justify-center items-center gap-5 ">
                    <div>
                      <Link to="/">
                        <BrandButton
                          text="Buy Now"
                          icon={<Icon icon="ic:baseline-greater-than" />}
                        />
                      </Link>
                    </div>
                    <div>
                      <Link to="#">
                        <WhiteButton text="Read Now ⇾" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 4 */}

        <SwiperSlide>
          <div className="bannerBG-4 h-[60vh] md:h-[75vh] flex items-end relative after:absolute after:content-normal after:bg-black after:opacity-50 after:h-full after:w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 z-10">
              <div></div>
              {/* Right Side: Text Area */}
              <div className="flex order-1 md:order-2 py-10 items-center justify-center  px-10 md:px-20">
                <div className="md:pl-10">
                  <h1
                    ref={textRef}
                    className={`text-2xl md:text-4xl text-center  font-bold bg-third text-white p-3 md:px-5 mb-3  ${
                      activeSlideIndex === 0 ? "banner-zoom" : ""
                    }`}
                  >
                    A reader lives a{" "}
                    <span className="text-primary">thousand </span>
                    lives before he <span className="text-primary">dies.</span>
                  </h1>

                  <article
                    ref={textRef}
                    className={`text-white md:p-5 text-base text-center md:text-xl font-extralight ${
                      activeSlideIndex === 0 ? "banner-zoom" : ""
                    }`}
                  >
                    “The more that you read, the more things you will know. The
                    more that you learn, the more places you'll go.” “Books are
                    a uniquely portable magic.” “I kept always two books in my
                    pocket, one to read, one to write in.”
                  </article>
                  {/* Button: Booking Now & Details More */}
                  <div className="my-3 md:px-5 flex justify-center items-center gap-5 md:justify-center">
                    <div>
                      <Link to="/">
                        <BrandButton
                          text="Buy Now"
                          icon={<Icon icon="ic:baseline-greater-than" />}
                        />
                      </Link>
                    </div>
                    <div>
                      <Link to="/">
                        <WhiteButton text="Read Now ⇾" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <div className="space-x-3 absolute bottom-0 md:bottom-5 z-10 right-5 md:hidden group-hover:block">
          <button
            className="prev-button-1 bg-primary rounded-full p-0.5 md:p-1"
            onClick={() => goPrevButton()}
          >
            <Icon
              icon="ep:arrow-left-bold"
              width={40}
              className="text-white font-bold"
            />
          </button>
          <button
            className="next-button-1 bg-primary rounded-full p-0.5 md:p-1"
            onClick={() => goNextButton()}
          >
            <Icon
              icon="ep:arrow-right-bold"
              width={40}
              className="text-white font-bold"
            />
          </button>
        </div>
      </Swiper>
    </>
  );
};

export default BannerSwiper;
