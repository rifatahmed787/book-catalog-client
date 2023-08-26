import EditBookForm from "@/components/EditBook/EditBookForm";
import { useAppSelector } from "@/hooks/reduxHook";
import { useGetBookDetailsQuery } from "@/redux/features/book/bookApi";
import { IBook } from "@/types/Book";
import { IUser } from "@/types/User";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EditBook = () => {
	const { bookID } = useParams();

	// user state from redux
	const { isLoggedIn, user } = useAppSelector((state) => state.auth);

	//bookDetailsSkip state
	const [bookDetailsSkip, setBookDetailsSkip] = useState(true);
	useEffect(() => {
		if (bookID) {
			setBookDetailsSkip(false);
		}
	}, [bookID]);

	// Get books query
	const {
		data: book_details_data,
		isLoading,
		isError,
		// error,
	} = useGetBookDetailsQuery(bookID, { skip: bookDetailsSkip });

	const book_details: IBook = book_details_data?.data;
	const book_added_by: IUser = book_details?.added_by as IUser;

	return (
		<div className="min-h-[90vh]  bg-box-pattern w-full flex justify-center ">
			{!isLoading &&
				!isError &&
				isLoggedIn &&
				user?._id === book_added_by?._id && (
					<EditBookForm book_details={book_details} />
				)}
		</div>
	);
};

export default EditBook;

