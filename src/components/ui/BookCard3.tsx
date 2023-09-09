/* eslint-disable react-hooks/exhaustive-deps */
import { get_error_messages } from "@/lib/error_messages";
import { useDeleteBookFromWishMutation } from "@/redux/features/wish/wishApi";
import ICONS from "@/shared/AllIcons";
import { IBook } from "@/types/Book";
import { useEffect, useState, useContext } from "react";
import ToastContainer from "./Toast";
import { useAppSelector } from "@/hooks/reduxHook";
import { useRemoveBookFromReadingListMutation } from "@/redux/features/reading/readingApi";
import { useNavigate } from "react-router-dom";
import { IWish } from "@/types/Wish";
import { IReading } from "@/types/Reading";
import { DarkModeContext } from "../DarkModeContext/DarkModeContext";

const BookCard3 = ({
  wish_book,
  reading_book,
}: {
  wish_book?: IWish;
  reading_book?: IReading;
}) => {
  const { darkMode } = useContext(DarkModeContext);
  const book: IBook = wish_book
    ? (wish_book?.book_id as IBook)
    : (reading_book?.book_id as IBook);

  const { user, isLoggedIn } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  // add in wish mutation hook
  const [
    deleteBookFromWish,
    {
      data: removeFromWishData,
      isLoading: isRemoveWisLoading,
      isError,
      error,
      isSuccess,
    },
  ] = useDeleteBookFromWishMutation();

  // add in reading  list  mutation
  const [
    removeBookFromReadingList,
    {
      data: removeFromReadData,
      isLoading: IRemoveFromReadLoading,
      isError: IsRemoveFromReadError,
      error: removeIntoReadError,
      isSuccess: isRemoveFromReadSuccess,
    },
  ] = useRemoveBookFromReadingListMutation();

  // Alert State
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [AlertType, setAlertType] = useState<"success" | "error" | "warning">(
    "success"
  );
  const [AlertMessages, setAlertMessages] = useState("");

  //wishListHandler
  const wishListHandler = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    isLoggedIn
      ? deleteBookFromWish({
          _id: wish_book?._id,
          book_id: book?._id,
          user_id: user?._id,
        })
      : navigate("/auth/signin");
  };
  //Addin to readlist handler
  const ReadListHandler = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    isLoggedIn
      ? removeBookFromReadingList({
          _id: reading_book?._id,
          book_id: book?._id,
          user_id: user?._id,
        })
      : navigate("/auth/signin");
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
      setAlertMessages(removeFromWishData?.message);
    }
  }, [error, isError, isSuccess]);
  useEffect(() => {
    if (
      IsRemoveFromReadError &&
      removeIntoReadError &&
      "data" in removeIntoReadError
    ) {
      setIsAlertOpen(true);
      setAlertType("error");
      const error_messages = get_error_messages(removeIntoReadError);
      setAlertMessages(error_messages);
    } else if (isRemoveFromReadSuccess) {
      setIsAlertOpen(true);
      setAlertType("success");
      setAlertMessages(removeFromReadData?.message);
    }
  }, [IsRemoveFromReadError, removeIntoReadError, isRemoveFromReadSuccess]);

  // card Click Handler
  const cardClickHandler = () => {
    navigate(`/books/${book?._id}`);
  };

  return (
    <div
      className={`relative bg-white shadow-md w-[370px] overflow-hidden h-[498px] flex flex-col cursor-pointer ${
        darkMode ? "bg-gradient-backdrop" : ""
      }`}
      onClick={() => cardClickHandler()}
    >
      {/* Image */}

      <div className="group h-[300px] overflow-hidden border-[5px] border-white">
        <div className="block shadow-lg relative after:absolute after:content-normal group-hover:after:bg-black/60 after:left-0 after:top-0 after:w-full after:h-full after:duration-700">
          <img
            src={book?.cover_image}
            className="w-full h-full object-cover transition-transform transform group-hover:scale-110 duration-300"
            alt=""
          />
        </div>
      </div>

      {/* other items */}
      <div className="mt-[18px]">
        {/* title & rating  */}
        <div className="flex justify-between gap-5 px-4 ">
          <p className="text-primary font-inter  text-2xl font-medium    ">
            {book?.title} <span className="text-sm">by-{book.author}</span>
          </p>

          <p className="text-primary font-inter border-none text-xl text-right font-bold flex items-center gap-2 ">
            {Array.from({ length: book.rating }, (_, index) => (
              <span key={index}>{ICONS.star_icon}</span>
            ))}
            {book.rating}
          </p>
        </div>
        {/*  */}

        <div className="my-[27px] px-4 flex items-center justify-between gap-3 flex-wrap">
          <p
            className={`text-[#3C3C3C] font-inter  text-base font-normal ${
              darkMode ? "text-gray-300" : ""
            }`}
          >
            {book.publication_date}
          </p>
          <p
            className={`text-[#3C3C3C] font-inter  text-base font-bold ${
              darkMode ? "text-gray-300" : ""
            }`}
          >
            $ {book.price}
          </p>
          <p
            className={`text-[#3C3C3C] font-inter  text-base font-normal ${
              darkMode ? "text-gray-300" : ""
            }`}
          >
            pages: {book.pages}
          </p>
        </div>
      </div>

      {/* buttons*/}
      <div className="  border-t border-primary p-[10px]  h-14 px-4  flex items-center justify-center mt-auto">
        {!wish_book && (
          <button
            className={`text-[#3C3C3C] font-inter h-full  text-lg font-semibold flex items-center 
            gap-2 ${darkMode ? "text-gray-300" : ""}`}
            onClick={ReadListHandler}
          >
            Remove From ReadingList
            {IRemoveFromReadLoading
              ? ICONS.button_loading_icon
              : ICONS.delete_icon}
          </button>
        )}
        {!reading_book && (
          <button
            className={`text-[#3C3C3C] font-inter h-full  text-lg font-semibold flex items-center 
            gap-2 ${darkMode ? "text-gray-300" : ""}`}
            onClick={wishListHandler}
          >
            Remove From WishList
            {isRemoveWisLoading ? ICONS.button_loading_icon : ICONS.delete_icon}
          </button>
        )}
      </div>

      {/* Toast */}
      {isAlertOpen && (
        <ToastContainer
          type={AlertType}
          messages={AlertMessages}
          isAlertOpen={isAlertOpen}
          setIsAlertOpen={setIsAlertOpen}
          className="absolute  top-0 z-50 left-0 right-0 mx-auto flex justify-center"
        />
      )}
    </div>
  );
};

export default BookCard3;
