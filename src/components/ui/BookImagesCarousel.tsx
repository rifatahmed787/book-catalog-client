// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const BookImagesCarousel = ({ images }: { images: string[] }) => {
  return (
    <Swiper
      slidesPerView={"auto"}
      spaceBetween={30}
      pagination={{
        dynamicBullets: true,
        clickable: true,
      }}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      modules={[Navigation, Pagination, Autoplay]}
      className="  w-full h-full"
    >
      {images?.map((item, index) => {
        return (
          <SwiperSlide
            className=" w-full aspect-square border-[5px] border-white"
            key={index * 207}
          >
            <img src={item} className="w-full h-full object-cover " />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default BookImagesCarousel;
