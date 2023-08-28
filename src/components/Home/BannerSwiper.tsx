import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import BrandButton from "../BrandButton/BrandButton";
import WhiteButton from "../BrandButton/WhiteButton";

const BannerSwiper = () => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const textRef = useRef<HTMLDivElement | null>(null);

  const handleSlideChange = (swiper: { activeIndex: number }) => {
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
        modules={[Autoplay, EffectFade, Navigation]}
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="bannerBG-1 md:h-[75vh] h-screen flex items-end relative after:absolute after:content-normal after:bg-black after:opacity-20 after:h-full after:w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 z-10">
              {/* Left Side: Text Area */}
              <div className="flex py-10 items-center justify-center md:justify-start px-10 md:px-20">
                <div>
                  <h1
                    ref={textRef}
                    className={`text-2xl md:text-4xl text-center md:text-start font-bold bg-third text-white p-3 md:px-5 mb-3  ${
                      activeSlideIndex === 0 ? "banner-zoom" : ""
                    }`}
                  >
                    Today a <span className="text-primary">reader, </span>
                    tomorrow a <span className="text-primary">leader.</span>
                  </h1>

                  <article
                    ref={textRef}
                    className={`md:text-white md:p-5 text-black text-base text-center md:text-start md:text-xl font-extralight ${
                      activeSlideIndex === 0 ? "banner-zoom" : ""
                    }`}
                  >
                    “The more that you read, the more things you will know. The
                    more that you learn, the more places you'll go.” “Books are
                    a uniquely portable magic.” “I kept always two books in my
                    pocket, one to read, one to write in.”
                  </article>
                  {/* Button: Booking Now & Details More */}
                  <div className="my-3 md:px-5 flex justify-center items-center gap-5 md:justify-start">
                    <div
                      data-aos="fade-up"
                      data-aos-anchor-placement="bottom-bottom"
                    >
                      <Link to="/">
                        <BrandButton text="Buy Now >>" />
                      </Link>
                    </div>
                    <div
                      data-aos="fade-up"
                      data-aos-anchor-placement="bottom-bottom"
                    >
                      <Link to="#">
                        <WhiteButton text="Read Now →" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        {/* Slide 2 */}

        <SwiperSlide>
          <div className="bannerBG-2 md:h-[75vh] h-screen flex items-end relative after:absolute after:content-normal after:bg-black after:opacity-20 after:h-full after:w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Right Side: Text Area */}
              <div className="flex order-1 md:order-2 py-10 items-center justify-center md:justify-end px-10 md:px-20">
                <div className="md:pl-10">
                  <h1
                    ref={textRef}
                    className={`text-2xl md:text-4xl text-center md:text-start font-bold bg-third text-white p-3 md:px-5 mb-3  ${
                      activeSlideIndex === 0 ? "banner-zoom" : ""
                    }`}
                  >
                    A reader lives a{" "}
                    <span className="text-primary">thousand </span>
                    lives before he <span className="text-primary">dies.</span>
                  </h1>

                  <article
                    ref={textRef}
                    className={`md:text-white md:p-5 text-black text-base text-center md:text-start md:text-xl font-extralight ${
                      activeSlideIndex === 0 ? "banner-zoom" : ""
                    }`}
                  >
                    “The more that you read, the more things you will know. The
                    more that you learn, the more places you'll go.” “Books are
                    a uniquely portable magic.” “I kept always two books in my
                    pocket, one to read, one to write in.”
                  </article>
                  {/* Button: Booking Now & Details More */}
                  <div className="my-3 md:px-5 flex justify-center items-center gap-5 md:justify-start">
                    <div
                      data-aos="fade-up"
                      data-aos-anchor-placement="bottom-bottom"
                    >
                      <Link to="/">
                        <BrandButton text="Buy Now >>" />
                      </Link>
                    </div>
                    <div
                      data-aos="fade-up"
                      data-aos-anchor-placement="bottom-bottom"
                    >
                      <Link to="#">
                        <WhiteButton text="Read Now →" />
                      </Link>
                    </div>
                  </div>
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
