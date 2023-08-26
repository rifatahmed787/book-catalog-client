/* eslint-disable react-hooks/exhaustive-deps */
import Button from "../ui/Button";
import TextInput from "../ui/form_items/TextInput";
import { useEffect, useState } from "react";
import ToastContainer from "../ui/Toast";
import ICONS from "@/shared/AllIcons";
import { get_error_messages } from "@/lib/error_messages";
import TextArea from "../ui/form_items/TextArea";
import { useAppSelector } from "@/hooks/reduxHook";
import { IBook } from "@/types/Book";
import { useEditBookMutation } from "@/redux/features/book/bookApi";
import RatingPicker from "../ui/form_items/RatingPicker";

const EditBookForm = ({ book_details }: { book_details: IBook }) => {
	// user details
	const { user } = useAppSelector((state) => state.auth);

	// Add book mutation hook
	const [
		editBook,
		{ data: new_book_data, isLoading, isError, error, isSuccess },
	] = useEditBookMutation();

	// Alert State
	const [isAlertOpen, setIsAlertOpen] = useState(false);
	const [AlertType, setAlertType] = useState<
		"success" | "error" | "warning"
	>("success");
	const [AlertMessages, setAlertMessages] = useState("");

	// form state
	const [book_form, setBookForm] = useState({
		title: "",
		author: "",
		genre: "",
		publisher: "",
		language: "",
		pages: 0,
		rating: 0,
		description: "",
		cover_image: "",
		keynotes: [""],
		publication_date: "",
		added_by: "",
	});

	// initial value set
	useEffect(() => {
		setBookForm({
			title: book_details.title,
			author: book_details.author,
			genre: book_details.genre,
			publisher: book_details.publisher,
			language: book_details?.language,
			pages: book_details?.pages,
			rating: book_details?.rating,
			description: book_details?.description,
			cover_image: book_details?.cover_image,
			keynotes: book_details?.keynotes,
			publication_date: book_details?.publication_date,
			added_by: "",
		});
	}, [book_details]);

	//formSubmitHandler
	const formSubmitHandler = (e: React.SyntheticEvent) => {
		e.preventDefault();
		const book_data = book_form;
		book_data.added_by = user?._id as string;
		book_data.pages = Number(book_data.pages);
		book_data.rating = Number(book_data.rating);

		editBook({ bookID: book_details?._id, book_data });
	};

	// Input handler
	const inputChangeHandler = (
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLTextAreaElement>,
		key: string
	) => {
		if (key == "keynotes") {
			setBookForm((prev) => ({
				...prev,
				[key]: e.target.value.split(","),
			}));
		} else {
			setBookForm((prev) => ({
				...prev,
				[key]: e.target.value,
			}));
		}
	};

	//error and success handlaing
	useEffect(() => {
		if (isError && error && "data" in error) {
			setIsAlertOpen(true);
			setAlertType("error");
			const error_messages = get_error_messages(error);
			setAlertMessages(error_messages);
		} else if (isSuccess) {
			setIsAlertOpen(true);
			setAlertType("success");
			setAlertMessages(new_book_data?.message);
		}
	}, [error, isError, isSuccess]);

	return (
		<form
			onSubmit={formSubmitHandler}
			className=" my-4   flex  max-w-lg rounded-xl w-full  flex-col gap-4 bg-[#FFFFFF] px-7 md:px-14 py-6 "
		>
			<h1
				className=" text-[#000]   font-anton  text-[20px] md:text-[30px]   font-normal 
                      leading-[30px] md:leading-[50px]  letter-spacing  text-center  "
			>
				Edit book
			</h1>
			<div className="space-y-6 block relative">
				{/* Title */}
				<TextInput
					type="text"
					placeHolder="Title"
					currentValue={book_form.title}
					onChange={(e) =>
						inputChangeHandler(e, "title")
					}
					required={true}
				/>
				{/* Author */}
				<TextInput
					type="text"
					placeHolder="Author"
					currentValue={book_form.author}
					onChange={(e) =>
						inputChangeHandler(e, "author")
					}
					required={true}
				/>
				{/* Genre */}
				<TextInput
					type="text"
					placeHolder="Genre"
					currentValue={book_form.genre}
					onChange={(e) =>
						inputChangeHandler(e, "genre")
					}
					required={true}
				/>

				{/* Publisher */}
				<TextInput
					type="text"
					placeHolder="Publisher"
					currentValue={book_form.publisher}
					onChange={(e) =>
						inputChangeHandler(e, "publisher")
					}
					required={true}
				/>

				{/* Language  & Pages & Rating*/}
				<div className="grid grid-cols-3 gap-5">
					{/* Language */}
					<TextInput
						type="text"
						placeHolder="Language"
						currentValue={book_form.language}
						onChange={(e) =>
							inputChangeHandler(
								e,
								"language"
							)
						}
						required={true}
					/>

					{/* Pages */}
					<TextInput
						type="number"
						placeHolder="Pages"
						currentValue={book_form.pages}
						onChange={(e) =>
							inputChangeHandler(e, "pages")
						}
						required={true}
					/>
					{/* Rating */}
					<TextInput
						type="number"
						placeHolder="Rating"
						currentValue={
							book_form.rating as number
						}
						onChange={(e) =>
							inputChangeHandler(e, "rating")
						}
						required={true}
					/>
				</div>
				{/* Description */}
				<TextArea
					placeHolder="Description"
					currentValue={book_form.description}
					onChange={(e) =>
						inputChangeHandler(e, "description")
					}
					required={true}
				/>
				{/* key_notes */}

				<TextArea
					placeHolder="Key notes; Note:By comma separator you can add multiple notes"
					currentValue={book_form.keynotes.join(",")}
					onChange={(e) =>
						inputChangeHandler(e, "keynotes")
					}
					required={true}
				/>

				{/* Cover Image */}
				<TextInput
					type="text"
					placeHolder="Cover Image URL"
					currentValue={book_form.cover_image}
					onChange={(e) =>
						inputChangeHandler(e, "cover_image")
					}
					required={true}
				/>
				{/* Publication Date */}
				<TextInput
					type="date"
					placeHolder="Publication Date"
					currentValue={book_form.publication_date}
					onChange={(e) =>
						inputChangeHandler(
							e,
							"publication_date"
						)
					}
					required={true}
				/>

				{/* {/* Rating */}
				<RatingPicker
					current_value={book_form.rating}
					clickHandler={(value) =>
						setBookForm((prev) => ({
							...prev,
							["rating"]: Number(value),
						}))
					}
				/>
			</div>

			{/* Submit button */}
			<Button
				type="submit"
				title="Edit"
				className="  bg-[#B4E907]   w-full mx-auto py-[17px] md:py-[10px] px-10 mmd:px-14 border border-[#000]   
					 text-base font-medium rounded"
				icon={isLoading && ICONS.button_loading_icon}
				isDisabled={isLoading}
			/>

			{/* Toast */}
			{isAlertOpen && (
				<ToastContainer
					type={AlertType}
					messages={AlertMessages}
					isAlertOpen={isAlertOpen}
					setIsAlertOpen={setIsAlertOpen}
					className=" max-w-xs w-full absolute   top-20   right-0 flex justify-center"
				/>
			)}
		</form>
	);
};

export default EditBookForm;

