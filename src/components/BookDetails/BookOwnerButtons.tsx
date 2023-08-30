/* eslint-disable react-hooks/exhaustive-deps */
import Button from "../ui/Button";
import ICONS from "@/shared/AllIcons";
import { Link, useNavigate } from "react-router-dom";
import { IBook } from "@/types/Book";
import { useDeleteBookMutation } from "@/redux/features/book/bookApi";
import { useEffect, useState } from "react";
import { get_error_messages } from "@/lib/error_messages";
import ToastContainer from "../ui/Toast";
import DeleteBookModal from "./DeleteBookModal";

type IBookOwnerButtons = { book_info: IBook };
const BookOwnerButtons = ({ book_info }: IBookOwnerButtons) => {
  //
  const navigate = useNavigate();
  //Delete book mutation
  const [
    deleteBook,
    {
      data: delete_book_data,
      isLoading: isDeleteLoading,
      isError,
      error,
      isSuccess: deleteSUccess,
    },
  ] = useDeleteBookMutation();

  // Alert State
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [AlertType, setAlertType] = useState<"success" | "error" | "warning">(
    "success"
  );
  const [AlertMessages, setAlertMessages] = useState("");

  //formSubmitHandler
  const deleteHandler = () => {
    deleteBook({ bookID: book_info._id });
  };

  //error and success handlaing
  useEffect(() => {
    if (isError && error && "data" in error) {
      setIsAlertOpen(true);
      setAlertType("error");
      const error_messages = get_error_messages(error);
      setAlertMessages(error_messages);
    } else if (deleteSUccess) {
      setIsAlertOpen(true);
      setAlertType("success");
      setAlertMessages(
        `${delete_book_data?.message} , you will redirect to books pages `
      );
    }
  }, [error, isError, deleteSUccess]);

  useEffect(() => {
    if (deleteSUccess) {
      const timer = setTimeout(() => {
        isAlertOpen && setIsAlertOpen(false);
        navigate("/books");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [deleteSUccess]);

  return (
    <div className=" relative max-w-[1170px] mx-auto mb-10">
      <div className="flex items-start justify-end gap-5">
        <DeleteBookModal
          delete_book_handler={deleteHandler}
          isLoading={isDeleteLoading}
        />
        <Link to={`/books/edit-book/${book_info?._id}`}>
          <Button
            title="Edit Book"
            className="border border-black text-primary hover:bg-primary hover:border-primary hover:text-white duration-300 px-[20px] md:px-[40px] py-[10px] md:py-[18px] "
            icon={ICONS.edit_icon}
          />
        </Link>
      </div>

      {/* Toast */}
      {isAlertOpen && (
        <ToastContainer
          type={AlertType}
          messages={AlertMessages}
          isAlertOpen={isAlertOpen}
          setIsAlertOpen={setIsAlertOpen}
          className=" max-w-xs w-full absolute   top-20 z-50 right-0 flex justify-center"
        />
      )}
    </div>
  );
};

export default BookOwnerButtons;
