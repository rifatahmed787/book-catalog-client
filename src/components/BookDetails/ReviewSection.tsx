import { IBook } from "@/types/Book";
import ReviewsCarousel from "../ui/ReviewsCarousel";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetBookReviewsQuery } from "@/redux/features/review/reviewApi";
import { IReview } from "@/types/Review";

const ReviewSection = ({ book_details }: { book_details: IBook }) => {
	const { bookID } = useParams();

	// user state from redux
	// const { isLoggedIn, user } = useAppSelector((state) => state.auth);

	//bookDetailsSkip state
	const [bookReviewsSkip, setBookReviewsSkip] = useState(true);
	useEffect(() => {
		if (bookID) {
			setBookReviewsSkip(false);
		}
	}, [bookID]);

	// Get books query
	const {
		data: book_reviews_data,
		// isLoading,
		// isError,
		// error,
	} = useGetBookReviewsQuery({ bookID }, { skip: bookReviewsSkip });

	const book_reviews: IReview[] = book_reviews_data?.data;
	// const book_added_by: IUser = book_details?.added_by as IUser;
	return (
		<div className="max-w-[1170px] mx-auto px-4 md:px-0">
			{book_reviews?.length > 0 && (
				<>
					<div className="mb-20">
						<div className="max-w-[900px]">
							{/* title */}
							<h2 className=" text-[#3C3C3C] font-anton text-[40px] font-normal leading-[50px]">
								"{book_details?.title}"
								Reviews
							</h2>
							<p className="text-[#3C3C3C] text-base font-inter mt-[10px]  ">
								Uncover the magic of our
								book catalog through the
								eyes of our valued
								readers. From thrilling
								adventures to
								heartwarming romances
								and thought-provoking
								narratives, our diverse
								collection has left an
								indelible mark on the
								minds and hearts of
								those who have immersed
								themselves in these
								pages.
							</p>
						</div>
					</div>

					<ReviewsCarousel
						book_reviews={book_reviews}
					/>
				</>
			)}
		</div>
	);
};

export default ReviewSection;

