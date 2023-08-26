/* eslint-disable react-hooks/exhaustive-deps */
import BookListSkeleton from "./BookListSkeleton";
import { useGetReadingListQuery } from "@/redux/features/reading/readingApi";
import BookCard3 from "../ui/BookCard3";
import { IReading } from "@/types/Reading";

export default function ReadingBooksList() {
	// Get books query
	const {
		data: books,
		isLoading,
		isError,
		error,
	} = useGetReadingListQuery({});

	const books_lis_data = books?.data;

	return (
		<div className="bg-[#FAF9F5] min-h-[70vh] px-4  py-16 ">
			<div className=" max-w-[1170px] mx-auto">
				{/* Books list  */}
				{isLoading ? (
					<BookListSkeleton />
				) : (
					<div className="   w-full   grid grid-cols-1   sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 ">
						{!isError &&
							!error &&
							books_lis_data?.length > 0 &&
							books_lis_data?.map(
								(book: IReading) => {
									return (
										<BookCard3
											key={
												book._id
											}
											reading_book={
												book
											}
										/>
									);
								}
							)}
					</div>
				)}
			</div>
		</div>
	);
}

