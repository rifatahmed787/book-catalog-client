/* eslint-disable react-hooks/exhaustive-deps */
import { get_error_messages } from "@/lib/error_messages";
import { useDeleteBookFromWishMutation } from "@/redux/features/wish/wishApi";
import ICONS from "@/shared/AllIcons";
import { IBook } from "@/types/Book";
import { useEffect, useState } from "react";
import ToastContainer from "./Toast";
import { useAppSelector } from "@/hooks/reduxHook";
import { useRemoveBookFromReadingListMutation } from "@/redux/features/reading/readingApi";
import { useNavigate } from "react-router-dom";
import { IWish } from "@/types/Wish";
import { IReading } from "@/types/Reading";

const BookCard3 = ({
  wish_book,
  reading_book,
}: {
  wish_book?: IWish;
  reading_book?: IReading;
}) => {
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
      className=" relative bg-transparent w-full h-[498px] border border-[#000] flex flex-col   cursor-pointer  "
      onClick={() => cardClickHandler()}
    >
      {/* Image */}
      <img
        src={book?.cover_image}
        className="w-full  h-[274px]  object-cover overflow-hidden  border-b border-[#000]  "
        alt=""
      />
      {/* other items */}
      <div className="mt-[18px]">
        {/* title & rating  */}
        <div className="flex items-center justify-between gap-[24px] px-4 ">
          <p className="text-[#3C3C3C] font-inter  text-2xl font-medium    ">
            {book?.title}
          </p>

          <p className="text-[#3C3C3C] font-inter  text-xl  text-right font-bold  flex items-center gap-2 ">
            {ICONS.star_icon} {book?.rating}
          </p>
        </div>
        {/*  */}

        <div className="my-[27px] px-4 flex items-center justify-start gap-3 flex-wrap">
          <p className="text-[#3C3C3C] font-inter  text-base font-normal   ">
            {book?.publication_date}
          </p>
          <p className="text-[#3C3C3C] font-inter  text-base font-normal   ">
            {book?.pages} pages
          </p>
          <p className="text-[#3C3C3C] font-inter  text-base font-normal   ">
            by-{book?.author}
          </p>
        </div>
      </div>

      {/* buttons*/}
      <div className="  border-t border-[#000] p-[10px]  h-14 px-4  flex items-center justify-between mt-auto">
        {!wish_book && (
          <button
            className="text-[#3C3C3C] font-inter h-full  text-lg font-semibold flex items-center 
					gap-2  "
            onClick={ReadListHandler}
          >
            Remove from reading
            {IRemoveFromReadLoading ? ICONS.button_loading_icon : ""}
          </button>
        )}
        {!reading_book && (
          <button
            className="text-xm text-white px-6 ml-auto py-1 bg-[#000000]  "
            onClick={wishListHandler}
          >
            {isRemoveWisLoading
              ? ICONS.button_loading_icon
              : ICONS.heart_fill_icon}
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
          className="absolute  top-0 left-0 right-0 mx-auto flex justify-center"
        />
      )}
    </div>
  );
};

export default BookCard3;
