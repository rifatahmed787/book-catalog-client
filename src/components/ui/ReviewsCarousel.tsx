import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import ReviewCard from "./ReviewCard";
import { IReview } from "@/types/Review";

const ReviewsCarousel = ({ book_reviews }: { book_reviews: IReview[] }) => {
	return (
		<Swiper
			slidesPerView={"auto"}
			spaceBetween={30}
			pagination={{
				clickable: true,
			}}
			autoplay={{
				delay: 2500,
				disableOnInteraction: false,
			}}
			modules={[Navigation, Autoplay]}
			className="  w-full h-full   flex flex-col"
		>
			{book_reviews?.map((review) => {
				return (
					<SwiperSlide className="w-[478px] ">
						<ReviewCard review={review} />
					</SwiperSlide>
				);
			})}
		</Swiper>
	);
};

export default ReviewsCarousel;

