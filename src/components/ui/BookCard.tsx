/* eslint-disable react-hooks/exhaustive-deps */
import { get_error_messages } from "@/lib/error_messages";
import { useAddBookInWishMutation } from "@/redux/features/wish/wishApi";
import ICONS from "@/shared/AllIcons";
import { IBook } from "@/types/Book";
import { useEffect, useState } from "react";
import ToastContainer from "./Toast";
import { useAppSelector } from "@/hooks/reduxHook";
import { useAddBookInReadingListMutation } from "@/redux/features/reading/readingApi";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

const BookCard = ({ book }: { book: IBook }) => {
  const { user, isLoggedIn } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  // add in wish mutation hook
  const [
    addBookInWish,
    {
      data: addToWishData,
      isLoading: isAddToWisLoading,
      isError,
      error,
      isSuccess,
    },
  ] = useAddBookInWishMutation();

  // add in reading  list  mutation
  const [
    addBookInReadingList,
    {
      data: addInToReadData,
      isLoading: isAddToReadLoading,
      isError: isAddIntoReadError,
      error: addIntoReadError,
      isSuccess: isAddIntoReadSuccess,
    },
  ] = useAddBookInReadingListMutation();

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
      ? addBookInWish({
          book_id: book?._id,
          user_id: user?._id,
        })
      : navigate("/auth/signin");
  };
  //Addin to readlist handler
  const addInToReadListHandler = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    isLoggedIn
      ? addBookInReadingList({
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
      setAlertMessages(addToWishData?.message);
    }
  }, [error, isError, isSuccess]);
  useEffect(() => {
    if (isAddIntoReadError && addIntoReadError && "data" in addIntoReadError) {
      setIsAlertOpen(true);
      setAlertType("error");
      const error_messages = get_error_messages(addIntoReadError);
      setAlertMessages(error_messages);
    } else if (isAddIntoReadSuccess) {
      setIsAlertOpen(true);
      setAlertType("success");
      setAlertMessages(addInToReadData?.message);
    }
  }, [isAddIntoReadError, addIntoReadError, isAddIntoReadSuccess]);

  // card Click Handler
  const cardClickHandler = () => {
    navigate(`/books/${book?._id}`);
  };

  return (
    <div
      className=" relative bg-white shadow-md w-[370px] overflow-hidden h-[498px] flex flex-col cursor-pointer "
      onClick={() => cardClickHandler()}
    >
      {/* Image */}
      {/* <div className="group h-[300px] overflow-hidden border-[5px] border-white">
        <div className="relative after:absolute after:content-normal group-hover:after:bg-black/60 after:left-0 after:top-0 after:w-full after:h-full after:duration-700 ">
          <img
            src={book?.cover_image}
            className="w-full h-full object-cover transition-transform transform group-hover:scale-110 duration-300"
            alt=""
          />

          <div className="">
            <div className="relative inline-flex items-center justify-start px-4 py-2 mb-10 overflow-hidden font-medium transition-all bg-yellow-500 rounded hover:bg-blue-700 group">
              <button className="absolute z-10 -left-full top-1/2 transform group-hover:translate-x-1/2  text-primary bg-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {isAddToWisLoading ? (
                  ICONS.button_loading_icon
                ) : (
                  <Icon icon="mdi:heart" />
                )}
              </button>
              <span className="hidden absolute left-full top-1/2 -translate-y-1/2 ml-2 text-primary bg-white p-3 rounded-full group-hover:inline-block">
                Wishlist
              </span>
            </div>
          </div>
        </div>
      </div> */}

      <div className="group h-[300px] overflow-hidden border-[5px] border-white">
        <div className=" block  shadow-lg">
          <img
            src={book?.cover_image}
            className="w-full h-full object-cover transition-transform transform group-hover:scale-110 duration-300"
            alt=""
          />
          <div className="absolute transition duration-300 opacity-70 group-hover:bg-black/60 group-hover:opacity-90 w-full h-full z-10"></div>
          <div className="absolute left-0 right-0 bottom-0 p-6 z-30 transform translate-y-1/2 transition duration-500 h-full group-hover:translate-y-0 delay-100">
            <div className="h-1/2 relative">
              <div className="absolute bottom-0">
                <h2 className="font-bold text-white leading-tight transition duration-300 text-4xl pb-6 ">
                  I am Rifat
                </h2>
              </div>
            </div>
            <div className="h-1/2">
              <p className="text-white pb-4 opacity-0 transition duration-300 group-hover:opacity-100">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa
                est consectetur possimus reprehenderit aspernatur nulla,
                cupiditate voluptatibus quidem inventore ipsam.
              </p>

              <a
                href="/"
                className="relative inline-flex items-center justify-start px-4 py-2 mb-10 overflow-hidden font-medium transition-all bg-yellow-500 rounded hover:bg-blue-700 group"
              >
                <span className="w-20 h-20 rounded rotate-[-40deg] hover:bg-blue-700 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                <span className="relative w-full text-left text-white transition-colors duration-300 ease-in-out group-hover:text-white">
                  Read More
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* other items */}
      <div className="mt-[18px]">
        {/* title & rating  */}
        <div className="flex items-center justify-between gap-[24px] px-4 ">
          <p className="text-[#3C3C3C] font-inter  text-2xl font-medium    ">
            {book?.title}
          </p>

          <p className="text-[#3C3C3C] font-inter  text-xl  text-right font-bold  flex items-center gap-2 ">
            {ICONS.star_icon} {book.rating}
          </p>
        </div>
        {/*  */}

        <div className="my-[27px] px-4 flex items-center justify-start gap-3 flex-wrap">
          <p className="text-[#3C3C3C] font-inter  text-base font-normal   ">
            {book.publication_date}
          </p>
          <p className="text-[#3C3C3C] font-inter  text-base font-normal   ">
            {book.pages} pages
          </p>
          <p className="text-[#3C3C3C] font-inter  text-base font-normal   ">
            by-{book.author}
          </p>
        </div>
      </div>

      {/* buttons*/}
      <div className="  border-t border-[#000] h-14 px-4  flex items-center justify-between mt-auto">
        <button
          className=" h-full text-[#3C3C3C] font-inter  text-lg font-semibold flex items-center 
					gap-2  "
          onClick={addInToReadListHandler}
        >
          Start reading
          {isAddToReadLoading ? ICONS.button_loading_icon : ""}
        </button>
        <button
          className="text-xm text-white px-6 py-1 bg-[#000000]"
          onClick={wishListHandler}
        >
          {isAddToWisLoading ? ICONS.button_loading_icon : ICONS.heart_icon}
        </button>
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

export default BookCard;
