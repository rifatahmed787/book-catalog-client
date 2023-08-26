import { useGetLatestBooksQuery } from "@/redux/features/book/bookApi";
import BookCarousel from "../ui/BooksCarousel";
import Button from "../ui/Button";
import BooksCarouselSkeleton from "./BookCarouselSkeleton";
import { useNavigate } from "react-router-dom";

const LatestBooks = () => {
	const navigate = useNavigate();
	// Get books query
	const {
		data: books,
		isLoading,
		// isError,
		// error,
	} = useGetLatestBooksQuery({});

	const books_list_data = books?.data;

	return (
		<div className="max-w-[1170px] overflow-hidden mx-auto p-4">
			<div
				className="flex flex-col sm:flex-row items-center  sm:justify-between
			gap-6 sm:gap-20"
			>
				<h1 className="text-[#3C3C3C] font-anton text-[20px] md:text-[40px] font-normal leading-[50px] ">
					Latest books in collection
				</h1>
				<Button
					title="All Books"
					className="px-[20px] md:px-[40px] py-[10px] md:py-[20px] bg-[#000000]"
					onClickHandler={() => navigate("/books")}
				/>
			</div>
			<div className="mt-10 md:mt-14">
				{isLoading ? (
					<BooksCarouselSkeleton />
				) : (
					<BookCarousel
						books_list_data={books_list_data}
					/>
				)}
			</div>
		</div>
	);
};

export default LatestBooks;

